'use server';

import {googleAI} from '@genkit-ai/googleai';
import {genkit, type Plugin} from 'genkit';
import {createNextHandler} from '@genkit-ai/next';
import {z} from 'zod';

import '@/ai/flows/optimize-blog-for-seo'; // Make sure the flow is loaded

const plugins: Plugin[] = [googleAI()];

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
