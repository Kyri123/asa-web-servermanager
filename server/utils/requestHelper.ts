import type { EventHandlerRequest, H3Event } from 'h3';
import type { z } from 'zod';

export async function getBody<T extends z.Schema>(event: H3Event<EventHandlerRequest>, schema: T): Promise<z.infer<T>> {
	return schema.parse(await readBody(event));
}
