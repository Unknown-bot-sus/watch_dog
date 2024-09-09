const cameraGrid = document.getElementById('cameraGrid');
const addBtn = document.getElementById("add-btn");
addBtn.addEventListener('click', addCamera);

const user = JSON.parse(window.localStorage.getItem('user'));
const headers = {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`};
getCameras(user.id);


async function getCameras(userId) {
    try {
        const res = await fetch(`/api/v1/devices?userId=${userId}`, { headers });
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const body = await res.json();

        for (let camera of body.devices) {
            const cameraCard = createCameraCard(camera.id, camera.name, camera.imageUrl);
            cameraGrid.appendChild(cameraCard);
        }
        // You can now use the cameras data to update the UI or perform other actions
    } catch (error) {
        console.error('Failed to load cameras:', error);
    }
}

async function createCamera(userId, name) {
    try {
        const res = await fetch(`/api/v1/devices`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ userId, name })
        });
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const body = await res.json();
        const device = body.device;
        const cameraCard = createCameraCard(device.id, device.name, device.imageUrl);
        cameraGrid.appendChild(cameraCard);
    } catch (error) {
        console.error('Failed to create camera:', error);
    }
}


function createCameraCard(id, cameraName, imageUrl = './image.svg') {
    // Create the main card container
    const card = document.createElement('a');
    card.className = 'bg-white shadow rounded-lg text-center w-64 pb-5';
    card.id = id;
    card.href = `/detection?cameraId=${id}&name=${cameraName}`;

    // Create the image element
    const img = document.createElement('img');
    img.src = imageUrl;
    img.className = 'mx-auto bg-gray-200 w-full rounded mb-4';

    // Create the camera name paragraph
    const name = document.createElement('p');
    name.className = 'font-semibold ml-4 mb-4 text-left name';
    name.textContent = cameraName;

    // Create the button container
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'flex justify-end mr-2 space-x-2';

    // Create the rename button
    const renameButton = document.createElement('button');
    renameButton.className = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded';
    renameButton.textContent = 'Rename';
    renameButton.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        renameCamera(id, card)
    });

    // Create the delete button
    const deleteButton = document.createElement('button');
    deleteButton.className = 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        deleteCamera(id, card)
    });

    // Append buttons to the button container
    buttonContainer.appendChild(renameButton);
    buttonContainer.appendChild(deleteButton);

    // Append all elements to the card container
    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(buttonContainer);

    return card;
}

async function renameCamera(id, element) {
    let newName = prompt("Enter new name for the camera:");
    if (newName) {
        // Find the parent camera card and update the name
        // make an api request to update the camera name
        const res = await fetch(`/api/v1/devices/${id}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify({ name: newName })
        });

        element.querySelector('.name').textContent = newName;
    }
}

async function deleteCamera(id, element) {
    let confirmDelete = confirm("Are you sure you want to delete this camera?");
    if (confirmDelete) {
        const res = await fetch(`/api/v1/devices/${id}`, {
            method: 'DELETE',
            headers,
        });

        if (!res.ok) {
            throw new Error('Network response was not ok');
        }

        element.remove();
    }
}

function addCamera() {
    const name = prompt("Enter the name of the camera:");
    createCamera(user.id, name);
}
