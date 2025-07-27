import React, { useContext, useState } from 'react';
import axios from 'axios';
import Questions from '../../layout/Questions';
import Contextariable from '../../context/AppContext';
import AiAnswer from '../../layout/AiAnswer';
import { message } from 'antd';
import { FaRobot, FaBrain, FaChartLine, FaLightbulb } from 'react-icons/fa';

const Ai = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [input, setInput] = useState('');
  const [showRes, setShowRes] = useState(true);
  const [resObj, setResObj] = useState({});
  const {answer, setAnswer} = useContext(Contextariable);
  const API_KEY = 'aGJmHi2MCdTev8nzkd5qJhvBOukUegVQJOJvUIQE';

  const handleSubmit = async () => {
    console.log('Success');
    messageApi.open({
      type: 'success',
      content: 'Please Wait 10 sec',
    });
    try {
      const result = await axios.post('https://api.cohere.ai/v1/chat', // آدرس API Cohere
        {
          model: 'command-r-plus', // مدل مناسب برای چت
          message: BodyData, // این پارامتر اشتباه است!
          // باید از آرایه messages استفاده کنید:
          messages: [
            {
              role: 'user', // نقش کاربر
              content: BodyData // متن ورودی
            }
          ],
          max_tokens: 4000
        },
        {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : " https://api.cohere.ai/v1/chat"
          },
        }
      );

      // ذخیره پاسخ دریافتی
      console.log(result.data)
      // console.log(BodyData)
      console.log(result.data.text)
      // let resText = result.data.text.slice(0, -1)
      setResObj(JSON.parse(result.data.text))
      if(result.data.finish_reason === "COMPLETE"){
        setShowRes(false)
        console.log(showRes)
        console.log(resObj)
      }
    } catch (error) {
      console.error('خطا در ارتباط با Cohere:', error);
      messageApi.open({
        type: 'error',
        content: 'Error to get response',
      });
    }
  };


  let BodyData = `
**Role**: You are a cryptocurrency investment advisor specializing in behavioral analysis and financial psychology.
**Goal**: Generate a 300-word user profile analysis + create structured recommendations.

**Task**: Analyze the user profile below to:
1. Extract psychological and financial characteristics.
2. Create personalized crypto recommendations.
3. Suggest actionable steps.

**Steps**:
1. **Behavior Analysis**:
   - Identify emotional tendencies (FOMO, risk aversion, optimism).
   - Highlight contradictions (e.g., "trusts DeFi but fears regulation").
   - Extract keywords from open-ended responses.

2. **Financial Profile**:
  - Calculate "Risk Capacity" (1-10) based on:
  - Stated risk tolerance (e.g., "acceptance rate: 2").
  - Implicit factors (e.g., reaction to 50% loss).
  - Categorize investor type (e.g., "cautious explorer", "tech-oriented speculator").
  - Provide a 50-word description of the users financial profile and improvement suggestions.

3. **Market Alignment**:
  - Match coins to:
  - Technical interests (DeFi, NFT, etc.).
  - Ethical stance (Environmental concerns Y/N).
  - Time commitment ("2-5 hours per week" → low-maintenance coins).

4. **Narrative Summary**:
   - Write 3 paragraphs:
     1. **User Psychology**: Fears, motivations, contradictions.
     2. **Strategic Advice**: Risk allocation, coin choices, warnings.
     3. **Personalized Warnings**: (e.g., "Missing opportunities due to avoiding airdrops").

5. **Currency & Airdrop Introduction**:
   - For each recommended coin/airdrop:
     1. Introduction aligned with the users financial personality.
     2. Buy/sell price ranges (if applicable).
     3. Time commitment required.

6. result must be 4000 characters

7. Make sure to use this structure without any errors and check whether the JSON is correct before sending. 

**User Data** (JSON):
{
  ${JSON.stringify(answer)}
}

**Instructions**:
1. Identify conflicts (e.g., decentralization trust vs. environmental concerns).
2. Calculate risk score (1-10) using explicit and implicit factors.
3. Recommend 3 coins and 2 airdrops matching:
   - Technical interests (DeFi).
   - Risk tolerance (Low).
   - Time commitment (2-5h/week).
4. Output format (JSON):
  - Make sure to use this structure without any errors and check whether the JSON is correct before sending.
  - Without anything else outside of JSON.

**Output Format**:
{
    "analysis": {
        "investor_profile": {
            "investor_type": "Cautious Crypto Explorer",
            "risk_score": "3/10",
            "core_motivation": "Financial gains with a technological interest",
            "psychological_traits": [
                "Risk-averse",
                "Social Media Influenced",
                "Opportunistic"
            ],
            "contradictions": [
                "High interest in DeFi but quick sell reaction to profits.",
                "Trust in decentralization yet concerned about time spent."
            ]
        },
        "financial_health": {
            "time_commitment": "2-5 hours per week",
            "learning_curve": "Beginner, guided tools needed",
            "improvement_suggestions": "Diversify into low-maintenance DeFi and stablecoin options to balance risk. Consider staking for passive income."
        }
    },
    "narrative_summary": {
        "user_psychology": "Your profile indicates a strong desire for financial gains through cryptocurrency investment, with a particular interest in decentralized technologies. However, you also exhibit clear risk-averse tendencies, as evidenced by your quick sell reaction to profits and concern about potential losses. This cautious approach is further highlighted by your low acceptance rate and limited time commitment. Contradictions emerge between your trust in decentralized projects and your avoidance of eco-friendly initiatives, possibly due to a perception of higher risk or complexity. Overall, you are motivated by the potential rewards but approach the market with a measured, opportunistic mindset, influenced by social media trends and a desire for easy access.",
        "strategic_advice": "Given your risk profile and time constraints, it is essential to strike a balance between capital preservation and exploring the DeFi space. Consider allocating a larger portion of your portfolio to stablecoins, providing a stable base with near-zero volatility. You can then use the remaining funds to invest in established, low-maintenance DeFi projects, such as lending protocols. This strategy aligns with your interest in blockchain infrastructure and provides a more passive approach to crypto investing. Additionally, consider setting up price alerts to take advantage of quick profit opportunities without constant monitoring.",
        "personalized_warnings": [
            "Your reaction to sell quickly on profits may cause you to miss out on long-term gains. Consider setting target prices and partial sell orders to balance risk and reward.",
            "While social media can provide valuable insights, be cautious of FOMO-driven decisions. Cross-reference trends with technical analysis and trusted news sources.",
            "Despite your trust in decentralized projects, smart contract risks are inherent. Always assess the development team's reputation and perform your due diligence."
        ]
    },
    "recommendations": {
        "coins": [
            {
                "name": "Uniswap (UNI)",
                "allocation": "25%",
                "reason": "Uniswap is a leading decentralized exchange with a proven track record. It offers low-maintenance liquidity pooling and provides access to a wide range of DeFi tokens, aligning with your interest in blockchain infrastructure.",
                "price_targets": {
                    "buy_range": "$5.50 - $6.50 (current price: $6.02)",
                    "sell_target": "$9.50 (short-term), $12.00 (long-term)"
                },
                "time_commitment": "1-2 hours/week for monitoring and potential token swaps"
            },
            {
                "name": "USD Coin (USDC)",
                "allocation": "50%",
                "reason": "USDC is a stablecoin pegged 1:1 to the US dollar, offering near-zero volatility and capital preservation. It provides a stable base for your portfolio and can be easily swapped for other tokens when opportunities arise.",
                "price_targets": {
                    "buy_range": "Stable at $1.00",
                    "sell_target": "N/A (stablecoin)"
                },
                "time_commitment": "Minimal, occasional monitoring"
            },
            {
                "name": "Chainlink (LINK)",
                "allocation": "15%",
                "reason": "Chainlink is a well-established project providing decentralized oracle services, crucial for connecting smart contracts to real-world data. It aligns with your interest in blockchain infrastructure and has a strong track record, reducing smart contract risks.",
                "price_targets": {
                    "buy_range": "$7.00 - $9.00 (current price: $8.40)",
                    "sell_target": "$14.00 (long-term)"
                },
                "time_commitment": "2-3 hours/week for monitoring and potential trades"
            }
        ],
        "airdrops": [
            {
                "name": "Aave (AAVE)",
                "reason": "Aave is a prominent lending protocol, allowing you to earn interest on your crypto holdings. It offers a passive income stream and aligns with your interest in DeFi. AAVE tokens can be staked for rewards, providing a low-maintenance way to participate in DeFi.",
                "time_commitment": "1-2 hours/month for staking and rewards management"
            },
            {
                "name": "MakerDAO (MKR)",
                "reason": "MakerDAO is another established DeFi project, focusing on stablecoin issuance and lending. MKR tokens provide governance rights and can be staked for rewards. This airdrop suggestion aligns with your interest in stablecoins and passive income generation.",
                "time_commitment": "1-2 hours/month for governance and rewards participation"
            }
        ],
        "strategy": {
            "portfolio_allocation": "50% Stablecoins (USDC), 40% DeFi (Uniswap, Chainlink, Aave), 10% Airdrops (MKR, AAVE tokens)",
            "monitoring_tools": [
                "Set up price alerts for quick profit opportunities.",
                "Use CoinGecko and DeFiLlama for market and DeFi analytics.",
                "Follow trusted social media accounts for insights, but always cross-reference with technical analysis."
            ]
        }
    },
    "Result": "Overall, your profile suggests a cautious and opportunistic approach to crypto investing, influenced by social media trends and a strong interest in decentralized technologies. By diversifying your portfolio into stablecoins and carefully selected DeFi projects, you can balance risk and reward while taking advantage of passive income opportunities. This strategy aims to provide a more structured and time-efficient approach to crypto investing, aligning with your financial goals and risk tolerance.",
    "Adv": "This comprehensive analysis and recommendation guide aims to address your psychological and financial traits as a crypto investor. By understanding your motivations, concerns, and time constraints, these suggestions offer a tailored strategy to enhance your crypto investment journey, helping you make more informed and confident decisions."
}
`
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-4 md:p-6">
      {contextHolder}
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 shadow-2xl border border-white/20 mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-white flex items-center">
              <FaRobot className="mr-3 text-purple-400" />
              AI Crypto Advisor
            </h2>
            <div className="flex items-center space-x-4">
              <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                <span className="text-gray-300 text-sm">Analysis Status</span>
                <div className="text-white text-xl font-bold flex items-center">
                  <FaLightbulb className="mr-2 text-yellow-400" />
                  {showRes ? 'Ready' : 'Analyzing...'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Questions Section */}
          <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 shadow-2xl border border-white/20">
            <div className="flex items-center mb-6">
              <FaBrain className="text-2xl text-purple-400 mr-3" />
              <h3 className="text-xl font-semibold text-white">Investment Profile</h3>
            </div>
            <div className="space-y-4">
              <Questions />
            </div>
          </div>

          {/* AI Analysis Section */}
          <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 shadow-2xl border border-white/20">
            <div className="flex items-center mb-6">
              <FaChartLine className="text-2xl text-green-400 mr-3" />
              <h3 className="text-xl font-semibold text-white">AI Analysis</h3>
            </div>
            <div className="space-y-4">
              {showRes ? (
                <div className="bg-white/5 rounded-xl p-6 animate-fade-in">
                  <p className="text-gray-300 text-center">
                    Complete your investment profile to receive personalized crypto recommendations
                  </p>
                </div>
              ) : (
                <div className="bg-white/5 rounded-xl p-6 animate-fade-in">
                  <AiAnswer resObj={resObj} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={!showRes}
            className={`px-8 py-3 rounded-lg text-white font-semibold transform transition-all duration-300 ${
              showRes
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 hover:scale-105'
                : 'bg-gray-500 cursor-not-allowed'
            }`}
          >
            {showRes ? 'Generate Analysis' : 'Analyzing...'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ai;

