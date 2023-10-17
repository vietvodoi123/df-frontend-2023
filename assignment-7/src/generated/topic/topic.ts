/**
 * Generated by orval v6.18.1 🍺
 * Do not edit manually.
 * Swagger API
 * This is a swagger for API.
 * OpenAPI spec version: 1.0
 */
import useSwr from 'swr'
import type {
  SWRConfiguration,
  Key
} from 'swr'
import type {
  TopicsResponse,
  ErrorResponse
} from '.././model'
import { customInstance } from '../../api/Fetcher';


  
  /**
 * Get all topics
 * @summary Get all topics
 */
export const getTopics = (
    
 ) => {
      return customInstance<TopicsResponse>(
      {url: `/topics`, method: 'get'
    },
      );
    }
  

export const getGetTopicsKey = () => [`/topics`] as const;

    
export type GetTopicsQueryResult = NonNullable<Awaited<ReturnType<typeof getTopics>>>
export type GetTopicsQueryError = ErrorResponse

/**
 * @summary Get all topics
 */
export const useGetTopics = <TError = ErrorResponse>(
  options?: { swr?:SWRConfiguration<Awaited<ReturnType<typeof getTopics>>, TError> & { swrKey?: Key, enabled?: boolean },  }

  ) => {

  const {swr: swrOptions} = options ?? {}

  const isEnabled = swrOptions?.enabled !== false
    const swrKey = swrOptions?.swrKey ?? (() => isEnabled ? getGetTopicsKey() : null);
  const swrFn = () => getTopics();

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(swrKey, swrFn, swrOptions)

  return {
    swrKey,
    ...query
  }
}

