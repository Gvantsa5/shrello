import { Form, Input, Checkbox, Card, Space } from 'antd'
import SubmitButton from './style/Buttons'
import axios from 'axios';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
};
const tailLayout = {
    wrapperCol: { offset: 4, span: 16 },
};

const Login = () => {
    const onFinish = (values: any) => {
        if(!values.confirmed) {
            console.log('Success:', values);
        }
        const users = axios.get("http://localhost:3000/users", values)
        console.log(users)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Space>
            <Card 
                title="Log in to Shrello" 
                style={{ width: 500 }}
            >
                <Form
                    {...layout}
                    name='basic'
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item 
                        {...tailLayout}
                        name="remember" 
                        valuePropName="checked"
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <SubmitButton name={'Log in'}/>
                    </Form.Item>
                    <a href="/registration">Sign up for an account</a>
                </Form>
            </Card>
        </Space>
    )
}

export default Login