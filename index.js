import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const sesClient = new SESClient({ region: process.env.region });

const handler = async (event) => {
    const message = event.message || 'Default message';
    const subject = event.subject || 'Default subject';
    const toAddresses = event.toAddresses || process.env.toAddresses.split(',');
    const fromAddress = event.fromAddress || process.env.fromAddress;

    try {
        const command = new SendEmailCommand({
            Source: fromAddress,
            Destination: {
                ToAddresses: toAddresses, 
            },
            Message: {
                Subject: {
                    Data: subject,
                },
                Body: {
                    Text: {
                        Data: message,
                    },
                },
            },
        });

        const response = await sesClient.send(command);

        console.log('Email sent successfully', response);

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
            },
            body: JSON.stringify({ message: 'Email sent successfully!', response }),
        };
    } catch (error) {
        console.error('Error sending email', error);

        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
            },
            body: JSON.stringify({ message: 'Error sending email', error }),
        };
    }
};

export default handler;
