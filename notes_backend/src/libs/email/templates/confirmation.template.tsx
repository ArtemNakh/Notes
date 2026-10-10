import { Body, Heading, Link, Text } from '@react-email/components';
import { Html } from '@react-email/html';

interface ConfirmationTemplateProps {
  domain: string;
  token: string;
}

export function ConfirmationTemplate({
  domain,
  token,
}: ConfirmationTemplateProps) {
  const confirmLink = `${domain}/auth/email-verification?token=${token}`;

  return (
    <Html>
      <Body>
        <Heading>Підтвердження пошти</Heading>
        <Text>
          Вітаємо! Для підтвердження адресу електронної пошти, будь-ласка,
          перейди по наступному посиланню
        </Text>
        <Link href={confirmLink}>Підтвердження пошти</Link>
      </Body>
    </Html>
  );
}
