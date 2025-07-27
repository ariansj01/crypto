import { Typography } from 'antd';
import React from 'react'

const AiAnswer = ({resObj}) => {
const { Text } = Typography;
console.log(resObj)
  return (
    <div className='AiAnswerContainer my-3'>
    

        <div className="Analysis">
            <Text className='text-center' type="warning">Analysis investor profile</Text>
            <div className="investor_profile">
                <div className="">
                <p>investor type : <span className='titleColor'>{resObj.analysis.investor_profile.investor_type}</span></p>
                <p>risk score : <span className='titleColor'>{resObj.analysis.investor_profile.risk_score}</span></p>
                <p>core motivation : <span className='titleColor'>{resObj.analysis.investor_profile.core_motivation}</span></p>
                </div>
                <div className="">
                    <p>psychological traits:</p>
                    <ul>
                        {
                            resObj.analysis.investor_profile.psychological_traits.map(item => (
                                <li>{item}</li>
                            ))
                        }
                    </ul>
                </div>
                <ul>
                    {
                        resObj.analysis.investor_profile.contradictions.map(item => (
                            <li>{item}</li>
                        ))
                    }
                </ul>
            </div>
            <div className="financial_health">
                <h5>Financial health</h5>
                <p>time_commitment : <span className='titleColor'>{resObj.analysis.financial_health.time_commitment}</span></p>
                <p>learning_curve: <span className='titleColor'>{resObj.analysis.financial_health.learning_curve}</span></p>
                <p>improvement_suggestions: <span className='titleColor'>{resObj.analysis.financial_health.improvement_suggestions}</span></p>
            </div>
        </div>
        <div className="narrative">
        <p><span className='titleColor2 my-3'>user psychology</span> : {resObj.narrative_summary.user_psychology}</p>
        <p><span className='titleColor2 my-3'>strategic advice</span> : {resObj.narrative_summary.strategic_advice}</p>
        <div className="">
            <p><span className='titleColor2 my-3'>personalized_warnings</span></p>
            <ul>
            {
                resObj.narrative_summary.personalized_warnings.map(item => (
                    <li>{item}</li>
                ))
            }
            </ul>
        </div>
        </div>
        <div className="recommendations">
            <Text className='h4 my-4' type="warning">Coins</Text>
            <div className="coins border border-warning p-1 m-2 d-flex rounded-3">
            {
                resObj.recommendations.coins.map(item => (
                    <div className="coin border-end p-2">
                        <p>name: <span className='titleColor'>{item.name}</span></p>
                        <p>allocation: <span className='titleColor'>{item.allocation}</span></p>
                        <p>reason: {item.reason}</p>
                        <div className="">
                            <p>price_targets</p>
                            <ul>
                                <li className='my-3'>buy_range: <span className='titleColor'>{item.price_targets.buy_range}</span></li>
                                <li className='my-3'>sell_target:  <span className='titleColor'>{item.price_targets.sell_target}</span></li>
                            </ul>
                        </div>
                        <p>time_commitment: <small className='titleColor'>{item.time_commitment}</small></p>
                    </div>
                ))
            }
            </div>
            <div className="airdrops border border-warning p-1 m-2 d-flex rounded-3">
                {
                    resObj.recommendations.airdrops.map(item => (
                        <div className="airdrop">
                            <p>name: <span className='titleColor' >{item.name}</span></p>
                            <p>reason: {item.reason}</p>
                            <p>time_commitment: {item.time_commitment}</p>
                        </div>
                    ))
                }
            </div>
            <div className="strategy">
                <p>portfolio_allocation: <span className='titleColor' >{resObj.recommendations.strategy.portfolio_allocation}</span></p>
                <div className="monitoring_tools">
                    <p>monitoring_tools</p>
                    <ul>
                        {
                            resObj.recommendations.strategy.monitoring_tools.map(item => (
                                <li className='titleColor' >{item}</li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
        <div className="result">
            <p><span className='titleColor2' >Result</span> : {resObj.Result}</p>
        </div>
        <div className="adv">
            <p><span className='titleColor2'>Adv</span>: {resObj.Adv}</p>
        </div>
    </div>

  )
}

export default AiAnswer