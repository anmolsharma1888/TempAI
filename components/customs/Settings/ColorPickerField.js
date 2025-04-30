export default function ColorPickerField({ label, value, onHandleStyleChange }) {
  return (
    <div className="grid">
      <label>{label}</label>
      <input
        type="color"
        value={value || '#000000'}  // 👈 fallback if value is undefined
        onChange={(e) => onHandleStyleChange(e.target.value)}
      />

    </div>
  )
}
