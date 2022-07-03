import { RecoilRoot } from 'recoil';
import Field from './components/Field';
import Header from './components/Header';

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <Header />
        <Field />
      </div>
    </RecoilRoot>
  );
}

export default App;
