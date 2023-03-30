const deleteContainer = document.getElementById('delete-container')
const urlParams = new URLSearchParams(window.location.search);
const queryString = urlParams.get('config');
let activeDraggable = null;

function isPhone() {
  return /mobile/i.test(navigator.userAgent);
}

document.addEventListener('contextmenu', function(event) {
  event.preventDefault();
});

//Function for updating the price to reflect the current canvas items
const priceDisplay = document.getElementById('price-display')
function updateTotalPrice() {
  let totalPrice = 0
  const containerBoxes = document.querySelectorAll('.box');
  containerBoxes.forEach(containerBox => {
    const price = parseFloat(containerBox.dataset.price);
    totalPrice += price;
  });
  const type1Containers = document.querySelectorAll('.module-dock[data-type="type1"]');
  type1Containers.forEach(container => {
    const draggablesInContainer = container.querySelectorAll('.draggable');
    draggablesInContainer.forEach(draggable => {
      const price = parseFloat(draggable.dataset.price);
      totalPrice += price;
    });
  });
  priceDisplay.innerText = `Total: $${parseInt(totalPrice.toFixed(2))}`;
};

// Save Button
const save = document.getElementById('save')
save.addEventListener('click', function() {
  const draggableIds = [];
  const boxes = document.querySelectorAll('.box');
  boxes.forEach(box => {
    if (box.id.includes('one-two')) {
      draggableIds.push('z12');
    }
    if (box.id.includes('two-one')) {
      draggableIds.push('z21');
    }
    if (box.id.includes('three-one')) {
      draggableIds.push('z31');
    }
    if (box.id.includes('two-two')) {
      draggableIds.push('z22');
    }
    if (box.id.includes('two-three')) {
      draggableIds.push('z23');
    }
    if (box.id.includes('two-four')) {
      draggableIds.push('z24');
    }
    let parentContainer = box.parentNode;
    if (parentContainer.id.includes('canvas')) {
      draggableIds.push('00');
    } else {
      draggableIds.push(parentContainer.id);
    }
    const draggables = box.querySelectorAll('.draggable');
    draggables.forEach(draggable => {
      draggableIds.push(draggable.id);
    });
  })
  alert("Copy your configuration URL below: \n\nhttps://codapopksp.github.io/?config=" + draggableIds.join(''));
});


// Handle drag, drop, and mouse over for modules
const draggables = document.querySelectorAll('.draggable')
draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', function(event) {
    draggable.classList.add('dragging');
    event.dataTransfer.setData('text/plain', this.id);
    let tooltip = draggable.querySelector(".tooltip");
    tooltip.style.display = 'none';
    let parentContainer = draggable.parentNode;
    let parentContainerType = parentContainer.getAttribute("data-type");
    // Release container slot from forcing the tooltip to be on top
    if (parentContainerType === "type1") {
      let parentContainer2 = parentContainer.parentNode;
      let parentContainer3 = parentContainer2.parentNode;
      let parentContainer4 = parentContainer3.parentNode;
      parentContainer4.style.zIndex = '';
    }
  });
  
  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging');
    updateTotalPrice();
    let parentContainer = draggable.parentNode;
    let parentContainerType = parentContainer.getAttribute("data-type");
    // Release container slot from forcing the tooltip to be on top
    if (parentContainerType === "type1") {
      let parentContainer2 = parentContainer.parentNode;
      let parentContainer3 = parentContainer2.parentNode;
      let parentContainer4 = parentContainer3.parentNode;
      parentContainer4.style.zIndex = '';
    }
  });

  // Show tooltip and determine where to display the tooltip
  draggable.addEventListener('mouseover', (event) => {
    const tooltip = draggable.querySelector(".tooltip");
    draggable.classList.add("mouseover");
    tooltip.style.display = 'block';
    const rect = event.target.getBoundingClientRect();
    const position = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2);
    if (position < window.innerWidth / 2) {
      tooltip.classList.remove('right');
      tooltip.classList.add('left');
    } else {
      tooltip.classList.remove('left');
      tooltip.classList.add('right');
    }
    const positionv = rect.top + (rect.height / 2) - (tooltip.offsetHeight / 2);
    if (positionv < window.innerHeight / 2) {
      tooltip.classList.remove('bottom');
      tooltip.classList.add('top');
    } else {
      tooltip.classList.remove('top');
      tooltip.classList.add('bottom');
    }
    let parentContainer = draggable.parentNode;
    let parentContainerType = parentContainer.getAttribute("data-type");
    if (parentContainerType === "type1") {
      let parentContainer2 = parentContainer.parentNode;
      let parentContainer3 = parentContainer2.parentNode;
      let parentContainer4 = parentContainer3.parentNode;
      parentContainer4.style.zIndex = 70;
    }
  });
  
  draggable.addEventListener('mouseout', () => {
    let tooltip = draggable.querySelector(".tooltip");
    tooltip.style.display = 'none';
    draggable.classList.remove("mouseover");
    let parentContainer = draggable.parentNode;
    let parentContainerType = parentContainer.getAttribute("data-type");
    // Release container slot from forcing the tooltip to be on top
    if (parentContainerType === "type1") {
      let parentContainer2 = parentContainer.parentNode;
      let parentContainer3 = parentContainer2.parentNode;
      let parentContainer4 = parentContainer3.parentNode;
      parentContainer4.style.zIndex = '';
    }
  });
  
  draggable.addEventListener('touchstart', function(event) {
    activeDraggable = draggable;
    event.preventDefault()
  })
});

// Light Switch
const lightSwitch = document.getElementById('lights')
lightSwitch.addEventListener('click', function() {
  this.classList.toggle('light');
  const modules_with_lights = document.querySelectorAll('.draggable.light');
  modules_with_lights.forEach(module => {
    const image1 = module.querySelector('.image-1');
    const image2 = module.querySelector('.image-2');
    image1.classList.toggle('hidden');
    image2.classList.toggle('hidden');
  });
});

// Contact Button
const contactButton = document.getElementById('contact')
contactButton.addEventListener('click', function() {
  alert("===============================================\n\nIf you'd like to contact me, you may do so via Reddit, Discord, Instagram, or email.\n\nReddit:          u/CodapopKSP\nDiscord:        Codapop#1469\nInstagram:    untitled_space_craft\nemail:            UntitledSpaceCraft.Controllers@gmail.com\n\n\nFor more information, please visit my subreddit:\n\nhttps://www.reddit.com/r/UntitledSpaceCraft/\n\n===============================================");
});


const containerGrids = document.querySelectorAll('.container-grid, .container-grid2');
containerGrids.forEach(containerGrid => {
  containerGrid.addEventListener('dragover', (event) => {
    event.preventDefault();
  });

  // Determine the type of container and prepare the grid for resizing
  containerGrid.addEventListener('drop', (event) => {
    event.preventDefault();
    const draggable = document.querySelector('.dragging2');
    const dropContainer = event.target.closest('.container2');
    if (dropContainer && draggable) {
      dropContainer.appendChild(draggable);
      draggable.classList.add('dropped-box');
      if (draggable.classList.contains('two-four')) {
          dropContainer.classList.add('has-24child');
      }
      if (draggable.classList.contains('two-three')) {
          dropContainer.classList.add('has-23child');
      }
      if (draggable.classList.contains('two-two')) {
          dropContainer.classList.add('has-22child');
      }
      if (draggable.classList.contains('one-two')) {
          dropContainer.classList.add('has-12child');
      }
      if (draggable.classList.contains('three-one')) {
          dropContainer.classList.add('has-31child');
      }
      if (draggable.classList.contains('two-one')) {
        dropContainer.classList.add('has-21child');
      }
    }

    // Reset grids
    const containers = document.querySelectorAll('.container2');
    containers.forEach(container => {
      const containerChildren = container.children;
      if (containerChildren.length === 0) {
        container.classList.remove('has-24child');
        container.classList.remove('has-23child');
        container.classList.remove('has-22child');
        container.classList.remove('has-12child');
        container.classList.remove('has-31child');
        container.classList.remove('has-21child');
      }
    });
  });
});

// Buttons for adding new containers
document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-2x4');
    addButton.addEventListener('click', () => {
      addContainer(MarkV, '.two-four');
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-2x3');
    addButton.addEventListener('click', () => {
      addContainer(MarkIV, '.two-three');
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-2x2');
    addButton.addEventListener('click', () => {
      addContainer(MarkIII, '.two-two');
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-1x2');
    addButton.addEventListener('click', () => {
      addContainer(MarkIhoriz, '.one-two');
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-3x1');
    addButton.addEventListener('click', () => {
      addContainer(MarkII, '.three-one');
    });
});
document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-2x1');
  addButton.addEventListener('click', () => {
    addContainer(MarkIvert, '.two-one');
  });
});


// Delete Box
deleteContainer.addEventListener('dragover', (event) => {
  event.preventDefault();
});
deleteContainer.addEventListener('drop', (event) => {
    const id = event.dataTransfer.getData('text/plain');
    const elementToDelete = document.getElementById(id);
  
    if (elementToDelete && (elementToDelete.classList.contains('box'))) {
        elementToDelete.remove();
        const containers = document.querySelectorAll('.module-dock[data-type="type2"]');
        const droppedModules = elementToDelete.querySelectorAll('[draggable="true"]');
        for (const module of droppedModules) {
            for (const container of containers) {
                const emptySlots = container.querySelectorAll('.draggable').length < 1;
                if (emptySlots) {
                    container.appendChild(module);
                    break;
                }
            }
        }
        elementToDelete.remove();
    // Move modules back to 
    } else if (elementToDelete && elementToDelete.classList.contains('draggable')) {
        const containers = document.querySelectorAll('.module-dock[data-type="type2"]');
        let droppedIntoContainer = false;
        for (const container of containers) {
          const emptySlots = container.querySelectorAll('.draggable').length < 1;
            if (emptySlots) {
                container.appendChild(elementToDelete);
                elementToDelete.classList.remove("mouseover");
                let tooltip = elementToDelete.querySelector(".tooltip");
                tooltip.style.display = 'none';
                droppedIntoContainer = true;
                break;
            }
        }
    }
    // Reset grids
    const containers = document.querySelectorAll('.container2');
    containers.forEach(container => {
      const containerChildren = container.children;
      if (containerChildren.length === 0) {
        container.classList.remove('has-24child');
        container.classList.remove('has-23child');
        container.classList.remove('has-22child');
        container.classList.remove('has-12child');
        container.classList.remove('has-31child');
        container.classList.remove('has-21child');
      }
    });
    updateTotalPrice()
});

// Add a container of a specific size
function addContainer(containerData, type) {
    const existingBoxes = document.querySelectorAll('.dropped-box');
    const requiredBoxes = document.querySelectorAll('.box');
      if (existingBoxes.length === requiredBoxes.length) {
        const counter = Math.floor(Math.random() * 10000).toString() + type;
        // Choose a random ID
        const containerBoxHTML = `<div id="${counter}" ${containerData}`;
        const containerBoxElement = document.createElement('div');
        containerBoxElement.innerHTML = containerBoxHTML.trim();
        const containerBox = containerBoxElement.firstChild;
        const pageWrapper = document.getElementById('canvas');
        pageWrapper.appendChild(containerBox);
        updateTotalPrice()

        // Handle picking up the container
        const containerBoxes = document.querySelectorAll(type);
        containerBoxes.forEach(containerBox => {
          containerBox.addEventListener('dragstart', (event) => {
              if (event.target.id === counter) {
                  event.dataTransfer.setData('dragged', event.target.id);
                  event.target.classList.add('dragging2');
                  const id = event.target.id;
                  event.dataTransfer.setData('text/plain', id);
                  const containers = document.querySelectorAll('.container2')
                  containers.forEach(container => {
                      container.classList.add('has-drag');
                  })
                  deleteContainer.classList.add('highlight');
              }
          });

          // Drop the container
          containerBox.addEventListener('dragend', (event) => {
            if (event.target.id === counter) {
              event.target.classList.remove('dragging2');
              const containers = document.querySelectorAll('.container2')
              containers.forEach(container => {
                  container.classList.remove('has-drag');
              })
              deleteContainer.classList.remove('highlight');
            }
          });
        });

        // Handle module docks on containers
        const containers = document.querySelectorAll('.module-dock')
        containers.forEach(container => {
            container.addEventListener('dragover', e => {
              e.preventDefault()
            })
            container.addEventListener('drop', () => {
              const draggable = document.querySelector('.dragging')
              if (draggable) {
                container.appendChild(draggable);
                draggable.classList.remove('dragging');
              }
              updateTotalPrice();
            })
            container.addEventListener('touchend', function(event) {
              if (activeDraggable) {
                container.appendChild(activeDraggable);
                activeDraggable = null;
                event.preventDefault()
              }
            })
        })

        // Remove welcome message
        let messageElement = document.getElementById("welcome-message");
        messageElement.style.display = "none";
  } else {
    alert("Please drag and drop the current container either to a canvas grid or to the trash before adding a new container.");
  }
}

// Container Data
const MarkIhoriz = `
        class="one-two box" data-price="50" draggable="true">
          <div class="container-slot-row">
            <div class="module-dock" data-type="type1" style="background-image: url('containers/angled.png'); background-size: cover;"></div>
            <div class="module-dock" data-type="type1" style="background-image: url('containers/angled.png'); background-size: cover;"></div>
          </div>
        </div>
        `;
const MarkIvert = `
        class="two-one box" data-price="50" draggable="true">
          <div class="container-slot-row">
            <div class="module-dock" data-type="type1" style="background-image: url('containers/angled.png'); background-size: cover;"></div>
          </div>
          <div class="container-slot-row">
            <div class="module-dock" data-type="type1" style="background-image: url('containers/level.png'); background-size: cover;"></div>
          </div>
        </div>
        `;
const MarkII = `
        class="three-one box" data-price="60" draggable="true">
          <div class="container-slot-row">
            <div class="module-dock" data-type="type1" style="background-image: url('containers/angled.png'); background-size: cover;"></div>
          </div>
          <div class="container-slot-row">
            <div class="module-dock" data-type="type1" style="background-image: url('containers/level.png'); background-size: cover;"></div>
          </div>
          <div class="container-slot-row">
            <div class="module-dock" data-type="type1" style="background-image: url('containers/level.png'); background-size: cover;"></div>
          </div>
        </div>
        `;
const MarkIII = `
        class="two-two box" data-price="70" draggable="true">
          <div class="container-slot-row">
            <div class="module-dock" data-type="type1" style="background-image: url('containers/angled.png'); background-size: cover;"></div>
            <div class="module-dock" data-type="type1" style="background-image: url('containers/angled.png'); background-size: cover;"></div>
          </div>
          <div class="container-slot-row">
            <div class="module-dock" data-type="type1" style="background-image: url('containers/level.png'); background-size: cover;"></div>
            <div class="module-dock" data-type="type1" style="background-image: url('containers/level.png'); background-size: cover;"></div>
          </div>
        </div>
        `;
const MarkIV = `
        class="two-three box" data-price="90" draggable="true">
          <div class="container-slot-row">
            <div class="module-dock" data-type="type1" style="background-image: url('containers/angled.png'); background-size: cover;"></div>
            <div class="module-dock" data-type="type1" style="background-image: url('containers/angled.png'); background-size: cover;"></div>
            <div class="module-dock" data-type="type1" style="background-image: url('containers/angled.png'); background-size: cover;"></div>
          </div>
          <div class="container-slot-row">
            <div class="module-dock" data-type="type1" style="background-image: url('containers/level.png'); background-size: cover;"></div>
            <div class="module-dock" data-type="type1" style="background-image: url('containers/level.png'); background-size: cover;"></div>
            <div class="module-dock" data-type="type1" style="background-image: url('containers/level.png'); background-size: cover;"></div>
          </div>
        </div>
        `;
const MarkV = `
        class="two-four box" data-price="120" draggable="true">
          <div class="container-slot-row">
            <div class="module-dock" data-type="type1" style="background-image: url('containers/angled.png'); background-size: cover;"></div>
            <div class="module-dock" data-type="type1" style="background-image: url('containers/angled.png'); background-size: cover;"></div>
            <div class="module-dock" data-type="type1" style="background-image: url('containers/angled.png'); background-size: cover;"></div>
            <div class="module-dock" data-type="type1" style="background-image: url('containers/angled.png'); background-size: cover;"></div>
          </div>
          <div class="container-slot-row">
            <div class="module-dock" data-type="type1" style="background-image: url('containers/level.png'); background-size: cover;"></div>
            <div class="module-dock" data-type="type1" style="background-image: url('containers/level.png'); background-size: cover;"></div>
            <div class="module-dock" data-type="type1" style="background-image: url('containers/level.png'); background-size: cover;"></div>
            <div class="module-dock" data-type="type1" style="background-image: url('containers/level.png'); background-size: cover;"></div>
          </div>
        </div>
        `;

// Load a controller from a valid URL
function loadController(inputData) {
  let importConfig = inputData;
  let startIndex = 0;
  let objectArray = [];
  // Extract all containers from the string
  while (true) {
    const nextZIndex = importConfig.indexOf('z', startIndex + 1);
    if (nextZIndex === -1) {
      objectArray.push(importConfig.substring(startIndex));
      break;
    }
    objectArray.push(importConfig.substring(startIndex, nextZIndex));
    startIndex = nextZIndex;
  }
  // Parse the data from the container strings and determine the container type
  for (const object of objectArray) {
    const first5Chars = object.substring(0, 5);
    const containerAddress = first5Chars.substring(1);
    const modules = [];
    for (let i = 5; i < object.length; i += 2) {
      modules.push(object.substring(i, i + 2));
    }
    let containerType = '';
    if (containerAddress.startsWith('12')) {
        containerType = '.one-two'
        addContainer(MarkIhoriz, containerType);
    }
    if (containerAddress.startsWith('21')) {
      containerType = '.two-one'
      addContainer(MarkIvert, containerType);
    }
    if (containerAddress.startsWith('31')) {
      containerType = '.three-one'
      addContainer(MarkII, containerType);
    }
    if (containerAddress.startsWith('22')) {
      containerType = '.two-two'
      addContainer(MarkIII, containerType);
    }
    if (containerAddress.startsWith('23')) {
      containerType = '.two-three'
      addContainer(MarkIV, containerType);
    }
    if (containerAddress.startsWith('24')) {
      containerType = '.two-four'
      addContainer(MarkV, containerType);
    }
    const targetContainerId = containerAddress.slice(2);
    const boxes = document.querySelectorAll(containerType);
    // Determine the container address
    boxes.forEach(box => {
      let parentContainer = box.parentNode;
      if (parentContainer.id.includes('canvas')) {
        box.classList.add('dropped-box');
        if (targetContainerId!=='00') {
          const targetContainer = document.getElementById(targetContainerId);
          targetContainer.insertAdjacentElement('beforeend', box);
        }
        const draggables = modules.map(pair => document.getElementById(pair));
        const containers = box.querySelectorAll(`.module-dock[data-type="type1"]`);
        // Get all modules and add them to the containers
        for (let i = 0; i < modules.length; i++) {
          const draggable = draggables[i];
          const container = containers[i];
          if (draggable) {
            container.appendChild(draggable);
          }
        }
      }
    })
    // Update the canvas elements as if someone dragged and dropped the containers and modules
    const containers = document.querySelectorAll('.container2');
    containers.forEach(container => {
      const containerChildren = Array.from(container.children);
      if (containerChildren) {
        containerChildren.forEach(child => {
          if (child.classList.contains('two-four')) {
            container.classList.add('has-24child');
          }
          if (child.classList.contains('two-three')) {
            container.classList.add('has-23child');
          }
          if (child.classList.contains('two-two')) {
            container.classList.add('has-22child');
          }
          if (child.classList.contains('one-two')) {
            container.classList.add('has-12child');
          }
          if (child.classList.contains('three-one')) {
            container.classList.add('has-31child');
          }
          if (child.classList.contains('two-one')) {
            container.classList.add('has-21child');
          }
        })
      }
    })
  }
  updateTotalPrice()
}

window.onload = function() {
  if (queryString) {
    if (queryString.startsWith('z')) {
      loadController(queryString);
    }
  }
}