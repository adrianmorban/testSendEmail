import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';

const snsClient = new SNSClient({ region: process.env.region }); // Cambia la región si es necesario

const handler = async (event) => {
    // Extrae los parámetros del evento (cuerpo de la petición)
    const message = event.message || 'Default message';
    const subject = event.subject || 'Default subject';
    const topicArn = process.env.topicArn;

    try {
        const command = new PublishCommand({
            TopicArn: topicArn,
            Message: message,
            Subject: subject,
        });

        const response = await snsClient.send(command);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email sent successfully!', response }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error sending email', error }),
        };
    }
};

export default handler;
