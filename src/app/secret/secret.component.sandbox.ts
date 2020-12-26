import { sandboxOf } from 'angular-playground';
import { secretComponent } from './secret.component';

export default sandboxOf(secretComponent)
  .add('secret Component', {
    template: `<cm-secret></cm-secret>`
  });
