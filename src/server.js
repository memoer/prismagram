import './env';
import { GraphQLServer } from 'graphql-yoga';
import logger from 'morgan';
import schema from './schema';
import './passport';
import { authenticateJwt } from './passport';
import { isAuthenticated } from './middleware';

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema,
  // express의 request를 뜻한다.
  context: ({ request }) => ({ request, isAuthenticated }),
});

server.express.use(logger('dev'));
server.express.use(authenticateJwt);

server.start({ port: PORT }, () =>
  console.log(`✅ Server running on port http://localhost:${PORT}`),
);
