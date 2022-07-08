import Document, {Html, Head, Main, NextScript} from 'next/document'

class MyDocument extends Document {

  render() {
    return (
      <Html lang='en'>
        <Head>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"/>
          <link rel="stylesheet" href="https://unpkg.com/flowbite@1.4.1/dist/flowbite.min.css"/>
          <link rel="icon" href="data:;base64,="/>
          {/*<link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet"/>*/}
          {/*<script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>*/}
          {/*<Script src="https://cdn.quilljs.com/1.3.6/quill.snow.css"></Script>*/}
          {/*<Script src="https://cdn.quilljs.com/1.3.6/quill.js"></Script>*/}
        </Head>
        <body>
        <Main/>
        <NextScript/>
        <script src="https://unpkg.com/flowbite@1.4.7/dist/flowbite.js"></script>
        </body>
      </Html>
    )
  }
}

export default MyDocument
