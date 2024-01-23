import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { ProductRoute } from '@routes/products.route';
import { ValidateEnv } from '@utils/validateEnv';

ValidateEnv();

const app = new App([new UserRoute(), new AuthRoute(), new ProductRoute()]);

app.listen();
