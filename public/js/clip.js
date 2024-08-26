const clipContainer = document.getElementById('clip-container');
const user = JSON.parse(window.localStorage.getItem('user'));
fetchClips(user.id);

async function fetchClips(userId) {
    try {
        const res = await fetch(`/api/v1/detections?userId=${userId}`);
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const body = await res.json();

        for (let clip of body.detections) {
                const { date, time } = getDateAndTime(new Date(clip.createdAt));
                const clipRow = createClipRow(clip.id, date, time, clip.device.name, clip.description);
                clipContainer.appendChild(clipRow);
        }
    } catch (error) {
        console.error('Failed to load clips:', error);
    }
}

function createClipRow(id, date, time, location, description) {
    // Create the table row element
    const tr = document.createElement('tr');
    tr.className = 'border-b';

    // Create and append the date cell
    const dateTd = document.createElement('td');
    dateTd.className = 'px-6 py-4';
    dateTd.textContent = date;
    tr.appendChild(dateTd);

    // Create and append the time cell
    const timeTd = document.createElement('td');
    timeTd.className = 'px-6 py-4';
    timeTd.textContent = time;
    tr.appendChild(timeTd);

    // Create and append the location cell
    const locationTd = document.createElement('td');
    locationTd.className = 'px-6 py-4';
    locationTd.textContent = location;
    tr.appendChild(locationTd);

    // Create and append the description cell
    const descriptionTd = document.createElement('td');
    descriptionTd.className = 'px-6 py-4';
    descriptionTd.textContent = description;
    tr.appendChild(descriptionTd);

    // Create and append the delete button cell
    const buttonTd = document.createElement('td');
    buttonTd.className = 'px-6 py-4';
    const button = document.createElement('button');
    button.className = 'text-red-600 hover:text-red-800 font-bold';
    button.textContent = 'Delete';
    button.addEventListener('click', () => deleteClip(id, tr));
    buttonTd.appendChild(button);
    tr.appendChild(buttonTd);

    return tr;
}

async function deleteClip(id, element) {
    let confirmDelete = confirm("Are you sure you want to delete this camera?");
    if (confirmDelete) {
        const res = await fetch(`/api/v1/detections/${id}`, {
            method: 'DELETE',
        });

        if (!res.ok) {
            throw new Error('Network response was not ok');
        }

        element.remove();
    }
}

function getDateAndTime(dateObj) {
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1; // months are zero indexed
    const day = dateObj.getDate();

    // Format date as MM/DD/YY
    const formattedDate = `${month}/${day}/${year}`;

    // Extract time components
    let hours = dateObj.getHours();
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
    const formattedTime = `${hours}:${minutes}${ampm}`;

    return { date: formattedDate, time: formattedTime };
}