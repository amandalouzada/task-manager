import { container } from 'tsyringe';
import IHashProvider from './hashProvider/models/IHashProvider';
import BCryptHashProvider from './hashProvider/implementations/BcryptHashProvider';


container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
