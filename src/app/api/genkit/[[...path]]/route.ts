'use server';

import {createGcpAuth} from '@genkit-ai/google-auth';
import {googleAI} from '@genkit-ai/googleai';
import {genkit, type Plugin} from 'genkit';
import {createNextHandler} from '@genkit-ai/next';
import {z} from 'zod';

import '@/ai/flows/optimize-blog-for-seo'; // Make sure the flow is loaded

const gcpAuth = createGcpAuth();

const googleAIWithAuth = googleAI({
  apiVersion: 'v1beta',
  auth: gcpAuth,
});

const plugins: Plugin[] = [googleAIWithAuth];

genkit({
  plugins,
  enableTracingAndMetrics: true,
  telemetry: {
    instrumentation: {
      trace: {
        sampler: {
          type: 'parent-based-trace-id-ratio',
          config: {
            ratio: 1,
          },
        },
      },
    },
  },
});

export const {GET, POST} = createNextHandler();
