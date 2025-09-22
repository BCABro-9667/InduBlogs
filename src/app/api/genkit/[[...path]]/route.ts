import {nextHandler} from '@genkit-ai/next';
import '@/ai/flows/optimize-blog-for-seo'; // Make sure the flow is loaded
 
export const {GET, POST} = nextHandler();
