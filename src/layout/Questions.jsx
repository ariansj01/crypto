import React, { useContext, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Typography,
  message, 
  Steps,
  theme

} from 'antd';
import Contextariable from '../context/AppContext';
const { Text } = Typography;
const { TextArea } = Input;
const Questions = ({handleSubmit}) => {

  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const {answer, setAnswer} = useContext(Contextariable);



  const steps = [
    {
      title: 'First',
      content: 'First-content',
    },
    {
      title: 'Second',
      content: 'Second-content',
    },
    {
      title: 'Last',
      content: 'Last-content',
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    lineHeight: '260px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };


    const onFinish = (values) => {
        console.log(values);
        setAnswer({
          "Why are you interested in investing in cryptocurrencies?" : values.interested,
          "What would you do if your investment made a 50% profit overnight? And what if it lost 50%?" : values.investment ,
          "What was your worst or best investing experience? What did you learn from it?" : values.experience,
          "What could completely knock you out of the cryptocurrency market?" : values.completely,
          "How do you usually research new projects? (e.g. social media, technical analysis, consulting with others)" : values.research,
          "What do you imagine the cryptocurrency market will be like in 5 years? Where do you see yourself in it?" : values.years,
          "What is your acceptance rate from 1 to 5?" : values.acceptance,
          "How much time do you spend per week monitoring the market?" : values.monitoring,
          "Do you care about environmental projects?" : values.environmental,
          "Which areas of technology are most interesting to you?" : values.technology,
          "Do you trust decentralized projects?" : values.decentralized,
          "Which feature is most important when choosing a cryptocurrency?" : values.feature,
          "Do you use Airdrops?" : values.Airdrops,
          "What is your reaction to breaking market news (e.g., an exchange hack)?" : values.reaction,
          "What is your biggest concern in investing?" : values.biggest,
        })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

  return (
    <div className='QuestionContainer'>
     {/* <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div
        style={{
          marginTop: 24,
        }}
      >
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div> */}
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        style={{
          // maxWidth: 600,
        }}
        className='row'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Text type="warning">Why are you interested in investing in cryptocurrencies?</Text>
        <Form.Item className='col-6' label="" name="interested" required={true}>
          <TextArea rows={2} />
        </Form.Item>

        <Text type="warning">What would you do if your investment made a 50% profit overnight? And what if it lost 50%?</Text>
        <Form.Item className='col-6' label="" name="investment" required={true}>
          <TextArea rows={2} />
        </Form.Item>

        <Text type="warning">What was your worst or best investing experience? What did you learn from it?</Text>
        <Form.Item className='col-6' label="" name="experience" required={true}>
          <TextArea rows={2} />
        </Form.Item>

        <Text type="warning">What could completely knock you out of the cryptocurrency market?</Text>
        <Form.Item className='col-6' label="" name="completely" required={true}>
          <TextArea rows={2} />
        </Form.Item>

        <Text type="warning">How do you usually research new projects? (e.g. social media, technical analysis, consulting with others)</Text>
        <Form.Item className='col-6' label="" name="research" required={true}>
          <TextArea rows={2} />
        </Form.Item>

        <Text type="warning">What do you imagine the cryptocurrency market will be like in 5 years? Where do you see yourself in it?</Text>
        <Form.Item className='col-6' label="" name="years" required={true}>
          <TextArea rows={2} />
        </Form.Item>

        <Text type="warning">What is your acceptance rate from 1 to 5?</Text>
        <Form.Item className='col-6' label="" name="acceptance" required={true}>
          {/* <InputNumber  /> */}
          <Slider placeholder='1: Very conservative ↔ 5: Very aggressive' max={5} min={1}/>
        </Form.Item>

        <Text type="warning">How much time do you spend per week monitoring the market?</Text>
        <Form.Item className='col-6' label="" name="monitoring">
          <Select>
            <Select.Option value="Less than 2 hours">Less than 2 hours</Select.Option>
            <Select.Option value="Betwwen 2 or 5 hours">Betwwen 2 or 5 hours</Select.Option>
            <Select.Option value="Betwwen 5 or 10 hours">Betwwen 5 or 10 hours</Select.Option>
            <Select.Option value="More than 10 hours">More than 10 hours</Select.Option>
          </Select>
          </Form.Item>

        <Text type="warning">Do you care about environmental projects?</Text>
        <Form.Item className='col-6' label="" name="environmental" required={true}>
          <Radio.Group>
            <Radio value="yes"> Yes </Radio>
            <Radio value="no"> No </Radio>
          </Radio.Group>
        </Form.Item>

        <Text type="warning">Which areas of technology are most interesting to you?</Text>
        <Form.Item className='col-6' label="" name='technology'>
          <Select>
            <Select.Option value="Ai">Ai</Select.Option>
            <Select.Option value="Metaverse">Metaverse</Select.Option>
            <Select.Option value="Blockchain infrastructure">Blockchain infrastructure</Select.Option>
            <Select.Option value="DeFi">DeFi</Select.Option>
            <Select.Option value="NFT">NFT</Select.Option>
          </Select>
        </Form.Item>

        <Text type="warning">Do you trust decentralized projects?</Text>
        <Form.Item className='col-6' label="" name="decentralized" required={true}>
          <Radio.Group>
            <Radio value="yes"> Yes </Radio>
            <Radio value="no"> No </Radio>
          </Radio.Group>
        </Form.Item>

        <Text type="warning">Which feature is most important when choosing a cryptocurrency?</Text>
        <Form.Item className='col-6' label="" name='feature'>
          <Select>
            <Select.Option value="Market value">Market value</Select.Option>
            <Select.Option value="Development team">Development team</Select.Option>
            <Select.Option value="Real application">Real application</Select.Option>
            <Select.Option value="Active community">Active community</Select.Option>
          </Select>
        </Form.Item>

        <Text type="warning">Do you use Airdrops?</Text>
        <Form.Item className='col-6' label="" name="Airdrops" required={true}>
          <Radio.Group>
            <Radio value="yes"> Yes </Radio>
            <Radio value="no"> No </Radio>
            <Radio value="idont know what is this"> idont know what is this </Radio>
          </Radio.Group>
        </Form.Item>

        <Text type="warning">What is your reaction to breaking market news (e.g., an exchange hack)?</Text>
        <Form.Item className='col-6' label="" name='reaction'>
          <Select>
            <Select.Option value="Strategy change">Market value</Select.Option>
            <Select.Option value="Analyst review">Development team</Select.Option>
            <Select.Option value="No reaction">No reaction</Select.Option>
          </Select>
        </Form.Item>
        
        <Text type="warning">What is your biggest concern in investing? (short)</Text>
        <Form.Item className='col-6' label="" name="biggest" required={true}>
          <TextArea rows={2} />
        </Form.Item>

        <Form.Item label={null}>
            <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default () => <Questions />;