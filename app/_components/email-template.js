import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Hr,
} from "@react-email/components";

export const EmailTemplate = ({ response }) => {
  return (
    <Html>
      <Head />
      <Preview>You have received a file from File Sharing App</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>File Sharing App</Heading>
          <Hr />
          <Text style={text}>Hi {firstName},</Text>
          <Text style={text}>
            Someone has shared a file with you. Click the button below to
            download it.
          </Text>
          <Text style={text}>
            <b>File Name:</b> {response.fileName}
          </Text>
          <Text style={text}>
            <b>File Size:</b> {response.fileSize}
          </Text>
          <Text style={text}>
            <b>File Type:</b> {response.fileType}
          </Text>
          <Button href={response?.shortUrl} style={button}>
            Download File
          </Button>
          <Hr />
          <Text style={footer}>
            If you did not expect this email, you can safely ignore it.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: "Arial, sans-serif",
};

const container = {
  backgroundColor: "#ffffff",
  margin: "40px auto",
  padding: "40px",
  borderRadius: "8px",
  maxWidth: "600px",
  border: "1px solid #e6e6e6",
};

const heading = {
  fontSize: "24px",
  color: "#1a1a1a",
  marginBottom: "20px",
};

const text = {
  fontSize: "16px",
  color: "#444444",
  lineHeight: "1.6",
};

const button = {
  backgroundColor: "#007bff",
  color: "#ffffff",
  padding: "12px 24px",
  borderRadius: "6px",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  display: "inline-block",
  marginTop: "16px",
};

const footer = {
  fontSize: "12px",
  color: "#999999",
  marginTop: "20px",
};

export default EmailTemplate;
