/**
 * SHiESTY RAiDERS AWS Infrastructure Entry Point
 *
 * Two stacks in two regions:
 *   - RaiderToolsAuthCertStack (us-east-1) — ACM certificate for the
 *     Cognito custom domain `auth.shiesty.me`. Cognito requires
 *     the cert to live in us-east-1 because it serves the domain via
 *     CloudFront. This is the only reason the cert isn't in the main
 *     stack.
 *   - RaiderToolsStack (us-east-2) — everything else: HTTP API at
 *     `api.shiesty.me`, ArcTracker relay, schedule services,
 *     Cognito user pool, DynamoDB user table, KMS CMK, Discord OAuth
 *     bridge, and all `/me*`, `/me/state/*`, `/me/migrate` Lambdas + routes.
 *
 * The main stack imports the us-east-1 certificate by ARN so the stacks
 * remain region-independent during deployment.
 */

import * as cdk from 'aws-cdk-lib';
import { RaiderToolsStack } from '../lib/raider-tools-stack';
import { RaiderToolsAuthCertStack } from '../lib/raider-tools-auth-cert-stack';

const app = new cdk.App();

const account = process.env.CDK_DEFAULT_ACCOUNT;
const primaryEnv = { account, region: 'us-east-2' };
const certEnv = { account, region: 'us-east-1' };

const rootDomainName = 'shiesty.me';
const apiDomainName = 'api.shiesty.me';
const authDomainName = 'auth.shiesty.me';
const hostedZoneId = 'Z0930420Q5968APT8V16';

const allowedOrigins = [
  'https://shiesty.me',
  'http://localhost:5173',
];

const spaOrigin = 'https://shiesty.me';

const authCertStack = new RaiderToolsAuthCertStack(
  app,
  'RaiderToolsAuthCertStack',
  {
    env: certEnv,
    rootDomainName,
    hostedZoneId,
    authDomainName,
  },
);

new RaiderToolsStack(app, 'RaiderToolsStack', {
  env: primaryEnv,
  rootDomainName,
  hostedZoneId,
  apiDomainName,
  authDomainName,
  spaOrigin,
  allowedOrigins,
  arcAppKeySecretName: 'arctracker/appKey',
  discordSecretName: 'raider-tools/discord/oauth',
  authCertificateArn:
    'arn:aws:acm:us-east-1:845242190959:certificate/507be32c-75c6-4e8e-bce2-666d6b1c3166',
});
