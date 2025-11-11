import { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

function App() {
  const [code, setCode] = useState("# Python code here\nprint('Hello, world!')");
  const [output, setOutput] = useState("");

  const runCode = async () => {
    try {
      const res = await axios.post("http://localhost:8000/run", { code });
      setOutput(res.data.output);
    } catch (err) {
      setOutput("エラーが発生しました。サーバーが起動していない可能性があります。");
    }
  };

  return (
    <div className="p-6">
      <h1>Python コード実行サイト</h1>
      <Editor
        height="300px"
        defaultLanguage="python"
        value={code}
        onChange={(value) => setCode(value ?? "")}
      />
      <button onClick={runCode} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
        実行
      </button>
      <pre className="mt-4 bg-gray-100 p-3 rounded">{output}</pre>
    </div>
  );
}

export default App;
