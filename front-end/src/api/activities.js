const BASE ="http://localhost:5015";

export async function getActivities() {
    const res = await fetch(`${BASE}/api/activities`);
    if(!res.ok) throw new Error("Failed to fetch activities");
    return res.json();
}


export async function createActivity(activity){
    const res = await fetch(`${BASE}/api/activities`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(activity),
    });
    if(!res.ok) {
        const text = await res.text();
        throw new Error(text ||  "Failed to create activity");
    }
   return res.json();
}

export async function deleteActivity(id) {
    const res = await fetch(`{BASE}/api/activities/${id}`, {
    method: "DELETE",
    });

    if(!res.ok) {
        throw new Error("Failed to delete activity");
    }
}