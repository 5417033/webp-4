import { useEffect, useState } from "react";
import { fetchImages } from "./api";

function Form(props) {
  function handleSubmit(event) {
    event.preventDefault();
    const { breed } = event.target.elements;
    props.onFormSubmit(breed.value);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="field has-addons">
          <div className="control is-expanded">
            <div className="select is-fullwidth">
              <select name="breed" defaultValue="shiba">
                <option value="shiba">Shiba</option>
                <option value="akita">Akita</option>
              </select>
            </div>
          </div>
          <div className="control">
            <button type="submit" className="button is-dark">
              Reload
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function Form2() {
  function handleSubmit(event) {
    event.preventDefault();
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="field has-addons">
          <div className="control is-expanded">
            <div className="select is-fullwidth">
              <select name="breed" defaultValue="関東">
                <option value="関東">関東</option>
                <option value="関西">関西</option>
              </select>
            </div>
          </div>
          <div className="control">
            <button type="submit" className="button is-dark">
              Reload
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function Header() {
  return (
    <header className="hero is-link is-bold">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">ペットショップ日文</h1>
        </div>
      </div>
    </header>
  );
}

function Image(props) {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image">
        <img src={props.src} alt="cute dog!" />
        </figure>
      </div>
    </div>
  );
}

function Loading() {
  return <p>Loading...</p>;
}

function Shiba_Message(breed) {
  if(breed != "shiba"){
    return <p>柴犬（しばいぬ）は、日本原産の日本犬の一種。「しばけん」とも言われる。日本犬の中で唯一の小型犬で、オスは体高38 - 41 cm、メスは35 - 38 cmの犬種。基本的には小型犬に分類される。
    日本の天然記念物に指定された7つの日本犬種（現存は6犬種）の1つで、指定は1936年（昭和11年）12月16日。日本における飼育頭数は最も多い。日本犬保存会（日保）によれば、現在[いつ?]日本で飼育されている日本犬種（6犬種）のうち、柴犬は約80 %を占める。  
    日本国外でも人気が高く、日本語の読みをそのままローマ字にした「Shiba Inu」、略称の「Shiba」という名前で呼ばれている。</p>;
  }else{
    <p>秋田犬（あきたいぬ）</p>
    
  }
}

function Gallery(props) {
  const { urls } = props;
  if (urls == null) {
    return <Loading />;
  }
  return (
    <div className="columns is-vcentered is-multiline">
      {urls.map((url) => {
        return (
          <div key={url} className="column is-3">
            <Image src={url} />
            <a href="https://dog.ceo/dog-api/about">ペットショップに問い合わせる</a>
          </div>
        );
      })}
    </div>
  );
}

function Main() {
  const [urls, setUrls] = useState(null);
  useEffect(() => {
    fetchImages("shiba").then((urls) => {
      setUrls(urls);
    });
  }, []);
  function reloadImages(breed) {
    fetchImages(breed).then((urls) => {
      setUrls(urls);
    });
  }
  return (
    <main>
      <section className="section">
        <div className="container">
        <p>学籍番号：5417033</p>
        <p>氏名：松村亮直</p>
        <p>日本大学文理学部情報科学科Webプログラミング演習課題</p>
        <Form onFormSubmit={reloadImages} />
        <Form2 />
        <a href="https://ja.wikipedia.org/wiki/%E6%9F%B4%E7%8A%AC">引用元（Wikipedia）</a>
        </div>
      </section>
      <section className="section">
        <div className="container">
        <Shiba_Message />
        <Gallery urls={urls} />
        <video controls>
          <source src="rabbit320.mp4" type="video/mp4" />
          <p>お使いのブラウザーは HTML 動画に対応していません。</p>
        </video>
        <a href="https://developer.mozilla.org/ja/docs/Learn/JavaScript/Client-side_web_APIs/Video_and_audio_APIs">引用元</a>
      </div>
      </section>
    </main>
  );
}

function Footer() {
  return (
    <footer className="hero is-link is-bold">
      <div className="content has-text-centered">
        <p>Dog images are retrieved Dog API</p>
        <p>
          <a href="https://dog.ceo/dog-api/about">Donate to Dog API</a>
        </p>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;