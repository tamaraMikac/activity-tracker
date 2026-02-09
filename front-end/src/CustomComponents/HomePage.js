import { useState, useEffect } from "react";
import "../styles.css";
import { getActivities, createActivity, deleteActivity } from "../api/activities";


function HomePage() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    ime: "",
    opis: "",
    kategorija: "",
    trajanje: "",
    datum: "",
  });

  const categories = [
  "LEARNING",
  "TRAINING",
  "COOKING",
  "READING",
  "WORK",
  "FAMILY",
  "HEALTH",
  "HOUSEHOLD",
  "SOCIAL",
  "OTHER",
];

  function onChange(e) {
    setForm((f) => ({
      ...f,
      [e.target.name]: e.target.value,
    }));
  }

  async function load() {
    try {
        setError("");
        const data = await getActivities();
        setActivities(data);
    } catch(e) {
       setError(String(e.message || e));
    }
}
   
    useEffect(() => {
        load();
    }, []);
 
    async function onSave(e) {
    e.preventDefault();

    if(!form.ime.trim()) return setError("Activity name is required.")
    if(!form.datum) return setError("Date is required.")
    if(Number(form.trajanje) <= 0 ) return setError("Duration must be positive!")
    if(!form.kategorija) return setError("Category is required.")

        try {
            setError("");
                await createActivity({
                    ...form,
                    trajanje: Number(form.trajanje),
                });
            
                setForm({ ime: "", opis: "", kategorija: "", datum: "", trajanje: ""});
                await load();
        } catch(err) {
            setError(String(err.message || err))
        }
    }

    async function onDelete(id){
        if(!window.confirm("Delete this activity?")) return;
        try {
            setError("");
        await deleteActivity(id);
        await load();
    } catch(err) {
        setError(String(err.message || err));
    }
}

    const minutesByCategory = categories.reduce((acc, c) => {
   acc[c] = 0;
     return acc;
   }, {});

  for (const a of activities) {
  const cat = a.kategorija || "OTHER";
  const mins = Number(a.trajanje || 0);
  if (minutesByCategory[cat] === undefined) minutesByCategory[cat] = 0;
  minutesByCategory[cat] += mins;
}


const sortedActivities = [...activities].sort(
        (a,b) => new Date(b.datum) - new Date(a.datum)
      );

  return (
    <>
      <nav className="navbar">
        <div className="activity-tracker">
          <h1>
            <b>Activity Tracker </b>
          </h1>
        </div>
      </nav>

      {error && <div className="error">{error}</div>}


    <div className="layout">
        <div className="left">
      <div className="new-activity">
        <h1>
          <b>Add New Activity</b>
        </h1>

          <form className="form" onSubmit={onSave}>
          <input
            name="ime"
            placeholder="Activity name"
            value={form.ime}
            onChange={onChange}
          />

          <input
            name="opis"
            placeholder="Description"
            value={form.opis}
            onChange={onChange}
          />

          <input
            name="trajanje"
            placeholder="Duration (minutes)"
            type="number"
            min="1"
            value={form.trajanje}
            onChange={onChange}
          />

          <select
            name="kategorija"
            value={form.kategorija}
            onChange={onChange}
          >
            <option value="">Select category</option>
            <option value="LEARNING">Learning</option>
            <option value="TRAINING">Training</option>
            <option value="COOKING">Cooking</option>
            <option value="READING">Reading</option>
            <option value="WORK">Work</option>
            <option value="FAMILY">Family</option>
            <option value="HEALTH">Health</option>
            <option value="HOUSEHOLD">Household</option>
            <option value="SOCIAL">Social</option>
            <option value="OTHER">Other</option>
          </select>

          <input
            name="datum"
            type="date"
            value={form.datum}
            onChange={onChange}
          />

          <button type="submit">Save</button>
        </form>
      </div>


    

           <div className="activity-list">
            
        <h1>
           <b>My Activities</b>
        </h1>

        {activities.length === 0 ? (
           <p>No activities yet</p>
        ) : (
         <ul className="list">
            {sortedActivities.map((a) => (
               <li key={a.id} className="item">
                <div className="activityyHeader">
                <strong>{a.ime}</strong>
                </div>
                                
                <button type="button"className="deleteBtn" onClick={() => onDelete(a.id)}>🗑️</button>


               <div className="activityInfo">
              <span className="category">{a.kategorija}</span>
              <span>{a.trajanje} min</span>
               <span>{a.datum}</span>
          </div>

      {a.opis && <div className="activityDesc">{a.opis}</div>}

                 </li>
            ))}
          </ul>
        )}
      </div>
      </div>

        <div className="right">
        <section className="card">
        <h2>Statistics</h2>
        <div className="statistika">
          <div className="stat-row">
            <span>Learning</span>
            <b> {minutesByCategory.LEARNING}min</b>
          </div>
          <div className="stat-row">
            <span>Training</span>
            <b> {minutesByCategory.TRAINING}min</b>
          </div>
          <div className="stat-row">
            <span>Cooking</span>
            <b>{minutesByCategory.COOKING} min</b>
          </div>
          <div className="stat-row">
            <span>Reading</span>
            <b> {minutesByCategory.READING}min</b>
          </div>
          <div className="stat-row">
            <span>Work</span>
            <b> {minutesByCategory.WORK} min</b>
          </div>
          <div className="stat-row">
            <span>Family</span>
            <b>{minutesByCategory.FAMILY} min</b>
          </div>
          <div className="stat-row">
            <span>Health</span>
            <b> {minutesByCategory.HEALTH}min</b>
          </div>

               <div className="stat-row">
            <span>Household</span>
            <b> {minutesByCategory.HOUSEHOLD}min</b>
          </div>
          <div className="stat-row">
            <span>Social</span>
            <b> {minutesByCategory.SOCIAL} min</b>
          </div>
          <div className="stat-row">
            <span>Other</span>
            <b> {minutesByCategory.OTHER}min</b>
          </div>
        </div>
      </section>
      </div>
      </div>
    </>
  );
}

export default HomePage;
