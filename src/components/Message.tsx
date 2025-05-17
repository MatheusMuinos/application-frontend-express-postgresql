export default function Message({ type, text }: { type: 'error' | 'success', text: string }) {
  return (
    <div className={`message ${type}`}>
      {text}
    </div>
  );
}