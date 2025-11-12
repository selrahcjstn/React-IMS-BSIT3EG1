export function QuickTips({ tips }) {
  return (
    <div className="quick-tips">
      <ul className="quick-tips__list">
        {tips.map((tip, index) => (
          <li key={index} className="quick-tips__item">{tip}</li>
        ))}
      </ul>
    </div>
  )
}