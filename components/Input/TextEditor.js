import dynamic from "next/dynamic";
import {useEffect, useLayoutEffect, useRef} from "react";
import 'quill/dist/quill.snow.css';
import PropTypes from "prop-types";
// const Quill = dynamic(() => import('quill'), { ssr: false });
// export const Quill = dynamic(() => import('quill'), { ssr: false });
// import * as Quill from "quill";


const propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  getEditor: PropTypes.func,
};

const defaultProps = {
  className: undefined,
  placeholder: undefined,
  defaultValue: undefined,
  value: undefined,
  onChange: () => {
  },
  getEditor: () => {
  },
};

const TextEditor = (props) => {

  const {
    className,
    placeholder,
    defaultValue,
    label = '',
    // we're not really feeding new value to quill instance on each render because it's too
    // expensive, but we're still accepting 'value' prop as alias for defaultValue because
    // other components like <Form.Field> feed their children with data via the 'value' prop
    value: alsoDefaultValue,
    onChange,
    getEditor,
  } = props;

  console.log('also-default-value', alsoDefaultValue)

  const $editorContRef = useRef();
  const $editorRef = useRef();
  const initialValueRef = useRef(defaultValue || alsoDefaultValue || '');

  useEffect(() => {
  // useLayoutEffect(() => {
    let quill = new Quill($editorRef.current, {placeholder, ...quillConfig});

    const insertInitialValue = () => {
      // quill.clipboard.dangerouslyPasteHTML(0, initialValueRef.current);
      quill.clipboard.dangerouslyPasteHTML(0, alsoDefaultValue);
      quill.blur();
    };

    const handleContentsChange = () => {
      onChange(getHTMLValue());
    };
    const getHTMLValue = () => $editorContRef.current.querySelector('.ql-editor').innerHTML;

    insertInitialValue();
    getEditor({getValue: getHTMLValue});

    quill.on('text-change', handleContentsChange);
    return () => {
      quill.off('text-change', handleContentsChange);
      quill = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (

    <div className='mb-20 min-w-full'>
      {label && <label>{label}</label>}
      <div className="ql-toolbar ql-snow ql-container" id='our-ql' ref={$editorContRef}>
        <div className='ql-editor' ref={$editorRef}/>
      </div>
    </div>
  );
}

const quillConfig = {
  theme: 'snow',
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{list: 'ordered'}, {list: 'bullet'}],
      [{header: [1, 2, 3, 4, 5, 6, false]}],
      [{color: []}, {background: []}],
      ['clean'],
    ],
  },
};

TextEditor.propTypes = propTypes;
TextEditor.defaultProps = defaultProps;

export default TextEditor;
