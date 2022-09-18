interface ButtonProps {
  title: string;
}

function Button(props: ButtonProps) {
  return (
    <button>
      {props.title}
    </button>
  )
}
function App() {
  return (
    <>
      <Button title="Send" />
      <Button title="Update" />
      <Button title="Delete" />
    </>
  )
}

export default App