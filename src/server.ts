import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { ProductRoute } from '@routes/products.route';
import { ValidateEnv } from '@utils/validateEnv';

ValidateEnv();

const app = new App([new AuthRoute(), new ProductRoute()]);

app.listen();
