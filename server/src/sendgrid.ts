import { Group, People } from './googleUtil';
const sendgrid = require('@sendgrid/mail');

sendgrid.setApiKey(String(process.env.SENDGRID_API_KEY));
sendgrid.setSubstitutionWrappers('{{', '}}');

type EmailType = 'saveTheDate' | 'rsvp' | 'registry' | 'finalCountdown';

export interface SendEmailProps {
  people: People;
  group: Group;
  emailType: EmailType;
}

const templateIds: Record<EmailType, string> = {
  saveTheDate: 'd-ed6f03d6b457481787d5b8e31162f9b1',
  rsvp: '',
  registry: '',
  finalCountdown: ''
};

export const sendEmail = ({ people, group, emailType }: SendEmailProps) => {
  people
    .filter((p) => !!p)
    .forEach((person) => {
      const msg = {
        to: person.email,
        from: 'stoltewedding23@gmail.com',
        templateId: templateIds[emailType],
        dynamic_template_data: {
          phone: person.phone ?? 'Not Provided',
          companion: people
            .filter((p) => p.code !== person.code)
            .map((p) => p.firstName)
            .join(', ')
            .replace(/,([^,]*)$/, ', and' + '$1'),
          address:
            `${group?.address} ${group.address2} ${group.city}, ${group.state} ${group.zip} ${group.country}` ??
            'Not Provided'
        }
      };
      console.log('Email', JSON.stringify(msg));
      sendgrid.send(msg);
    });
};
