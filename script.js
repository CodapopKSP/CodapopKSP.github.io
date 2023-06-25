//|================|
//|     Script     |
//|================|


// Delete Container
const deleteContainer = document.getElementById('delete-container')

// URL Parameters
const urlParams = new URLSearchParams(window.location.search);
const queryString = urlParams.get('config');
const colorString = urlParams.get('color');

// Mobile-specific Variables
let activeDraggable = null;
function isPhone() {
  return /mobile/i.test(navigator.userAgent);
}

// Prevent users from right clicking
document.addEventListener('contextmenu', function(event) {
  event.preventDefault();
});


// Add modules to Left and Right module arrays
const moduleContainer_left = document.querySelector('.left-module-array');
const moduleContainer_right = document.querySelector('.right-module-array');
let moduleCounter = 0;

// Iterate over the moduleData array
moduleData.forEach(module => {
    // Create the module element
    const moduleDock = document.createElement('div');
    moduleDock.classList.add('module-dock');
    moduleDock.setAttribute('data-type', 'type2');
    
    const moduleElement = document.createElement('div');
    moduleElement.classList.add('draggable');
    moduleElement.setAttribute('draggable', 'true');

    // Set the module ID, price, and name
    moduleElement.setAttribute('id', module.id);
    moduleElement.setAttribute('data-price', module.price);
    moduleElement.setAttribute('data-name', module.name);

    // Create the module image element
    const moduleImage = document.createElement('img');
    moduleImage.src = module.image;
    moduleImage.classList.add('image-1');
    moduleElement.appendChild(moduleImage);

    // Check if the module has the image_light property
    if (module.image_light) {
        const moduleImageLight = document.createElement('img');
        moduleImageLight.src = module.image_light;
        moduleImageLight.classList.add('image-2');
        moduleImageLight.classList.add('hidden');
        moduleElement.appendChild(moduleImageLight);
        moduleElement.classList.add('light');
    }

    // Create the module tooltip element
    const moduleTooltip = document.createElement('span');
    moduleTooltip.style.fontFamily = "Roboto, sans-serif";
    moduleTooltip.classList.add('tooltip');

    // Create the module tooltip content
    const moduleTooltipContent = document.createElement('strong');
    moduleTooltipContent.style.fontSize = '1.8vh';
    moduleTooltipContent.textContent = module.name;

    const modulePrice = document.createElement('span');
    modulePrice.style.fontSize = '1.7vh';
    modulePrice.innerHTML = `<br>$${module.price}</br>`;

    const moduleDescription = document.createElement('span');
    moduleDescription.innerHTML = module.tooltip;

    moduleTooltip.appendChild(moduleTooltipContent);
    moduleTooltip.appendChild(modulePrice);
    moduleTooltip.appendChild(moduleDescription);

    moduleElement.appendChild(moduleTooltip);
    moduleDock.appendChild(moduleElement);

    // Append the module element to the container
    if (moduleCounter < 12) {
        moduleContainer_left.appendChild(moduleDock);
    } else {
        moduleContainer_right.appendChild(moduleDock);
    }
    moduleCounter += 1;
});


//|-------------------------|
//|     Sidebar Buttons     |
//|-------------------------|

// Color Picker Buttons
const colorButtons = document.querySelectorAll('.color-button');
const box = document.querySelector('.box');
colorButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const color = button.style.backgroundColor;
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
      box.style.borderColor = color;
    })
  });
});


//|------------------------|
//|     Header Buttons     |
//|------------------------|

// Recommended Configurations Button
const recommendedConfigsBtn = document.getElementById('recommendedConfigs');
recommendedConfigsBtn.addEventListener('click', function() {
  Swal.fire({
    title: 'Recommended Configurations',
    html:
    '<button id="btn1" class="btn btn-primary text-center" onclick="window.location.href=\'https://codapopksp.github.io/?config=z2400h1b1b2g1a3f3f5f6\'">Jebediah\'s Command</button>' +
    '<button id="btn2" class="btn btn-primary text-center" onclick="window.location.href=\'https://codapopksp.github.io/?config=z2300b3a4g1f3f6f5\'">USS Button Box</button>' +
    '<button id="btn3" class="btn btn-primary text-center" onclick="window.location.href=\'https://codapopksp.github.io/?config=z2300b1h1b2f2a5e1\'">Keyboard\'s Lament</button>' +
    '<button id="btn1" class="btn btn-primary text-center" onclick="window.location.href=\'https://codapopksp.github.io/?config=z1200f2a5\'">Keyboard Companion 1</button>' +
    '<button id="btn1" class="btn btn-primary text-center" onclick="window.location.href=\'https://codapopksp.github.io/?config=z1200f2g1\'">Keyboard Companion 2</button>' +
    '<button id="btn1" class="btn btn-primary text-center" onclick="window.location.href=\'https://codapopksp.github.io/?config=z2200a5b3f4f5\'">External Command Seat 1</button>' +
    '<button id="btn1" class="btn btn-primary text-center" onclick="window.location.href=\'https://codapopksp.github.io/?config=z2200g1b3f2a4\'">External Command Seat 2</button>' +
    '<button id="btn1" class="btn btn-primary text-center" onclick="window.location.href=\'https://codapopksp.github.io/?config=z2313h1b1b2f1f6g1z2115c1a3\'">Valentina\'s Command</button>' +
    '<button id="btn1" class="btn btn-primary text-center" onclick="window.location.href=\'https://codapopksp.github.io/?config=z3111a1h3e1z2413g1b1h1h2d1f3a2f5z3116c1b2f6&color=rgb(0,0,0)\'">Mission Control</button>',
    showCancelButton: true,
    cancelButtonText: 'Cancel',
    buttonsStyling: false,
    showConfirmButton: false,
    customClass: {
      cancelButton: 'btn btn-danger',
    },
  });
});



// Main Price Display
const priceDisplay = document.getElementById('price-display')
function updateTotalPrice() {
  let totalPrice = 0

  // Calculate price for containers
  const containerBoxes = document.querySelectorAll('.box');
  containerBoxes.forEach(containerBox => {
    const price = parseFloat(containerBox.dataset.price);
    totalPrice += price;
  });

  // Calculate price for modules
  const type1Containers = document.querySelectorAll('.module-dock[data-type="type1"]');
  type1Containers.forEach(container => {
    const draggablesInContainer = container.querySelectorAll('.draggable');
    draggablesInContainer.forEach(draggable => {
      const price = parseFloat(draggable.dataset.price);
      totalPrice += price;
    });
  });

  // Display price
  priceDisplay.innerText = `Total: $${parseInt(totalPrice.toFixed(2))}`;
};

// Save Button
const save = document.getElementById('save')
save.addEventListener('click', function() {
  const draggableIds = [];

  // Add container info to the URL
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

    // Add container location data
    let parentContainer = box.parentNode;
    if (parentContainer.id.includes('canvas')) {
      draggableIds.push('00');
    } else {
      draggableIds.push(parentContainer.id);
    }

    // Add module info to the URL
    const draggables = box.querySelectorAll('.draggable');
    draggables.forEach(draggable => {
      draggableIds.push(draggable.id);
    });
  })

  // Add the color information to the end of the draggableIds array
  const color = boxes[0].style.borderColor;
  if (color) {
    draggableIds.push(`&color=${color.replace(/\s/g, '')}`);
  } else {
    draggableIds.push(`&color=rgb(0,0,0)`);
  }
  const url = "https://codapopksp.github.io/?config=" + draggableIds.join('');

  // Copy the URL to the clipboard
  navigator.clipboard.writeText(url).then(() => {

    // Activate the button
    Swal.fire({
      title: 'Copied!',
      html: '<div>This configuration URL has been copied to your clipboard!<br><br>' + url + '</div>',
      icon: 'success',
      buttonsStyling: false,
      showConfirmButton: false,
      timer: 3000,
    });
  }).catch(() => {
    alert("Failed to copy the configuration URL to your clipboard. Please copy it manually: \n\n" + url);
  });
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


//|------------------------|
//|     Footer Buttons     |
//|------------------------|

// Contact Button
const contactButton = document.getElementById('contact')
contactButton.addEventListener('click', function() {
  Swal.fire({
    title: 'Contact Information',
    html:
    '<div style="font-family: \'Roboto\', sans-serif;">Click a button to copy.</div>' +
    '<button class="btn btn-reddit text-center" data-clipboard-text="https://www.reddit.com/user/CodapopKSP">Reddit:   u/CodapopKSP</button>' +
    '<button class="btn btn-discord text-center" data-clipboard-text="Codapop#1469">Discord:   codapopksp</button>' +
    '<button class="btn btn-insta text-center" data-clipboard-text="untitled_space_craft">Instagram: untitled_space_craft</button>' +
    '<button class="btn btn-email text-center" data-clipboard-text="untitledspacecraft.controllers@gmail.com">Email: untitledspacecraft\n.controllers@gmail.com</button>' +
    '<div style="font-family: \'Roboto\', sans-serif;"><br></br>You can also visit the Untitled Space Craft subreddit for more information.</div>' +
    '<button class="btn btn-primary text-center" onclick="window.open(\'https://www.reddit.com/r/UntitledSpaceCraft/\', \'_blank\')">Click to visit r/UntitledSpaceCraft</button>',
    showCancelButton: true,
    cancelButtonText: 'Cancel',
    buttonsStyling: false,
    showConfirmButton: false,
    customClass: {
      cancelButton: 'btn btn-danger',
    },

    // Copy contact info to the clipboard
    didOpen: () => {
      const clipboard = new ClipboardJS('.btn', {
        text: function(trigger) {
          return trigger.getAttribute('data-clipboard-text');
        }
      });
      clipboard.on('success', function(e) {
        e.clearSelection();
        Swal.fire({
          title: 'Copied to clipboard!',
          text: e.text,
          icon: 'success',
          buttonsStyling: false,
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            container: 'copy-to-clipboard'
          }
        });
      });
    }
  });
});

// Info Button
const infoButton = document.getElementById('info')
infoButton.addEventListener('click', function() {
  Swal.fire({
    title: 'Information',
    html:
    '<div style="font-family: \'Roboto\', sans-serif;"><br></br>For information about kits or further customization, please read the full guide.</div>' +
    '<button class="btn btn-primary text-center" onclick="window.open(\'https://www.reddit.com/r/UntitledSpaceCraft/comments/12hjtms/start_here_a_guide_to_untitled_space_craft/\', \'_blank\')">Starter Guide</button>' +
    '<div style="font-family: \'Roboto\', sans-serif;"><br></br>Useful Documents</div>' +
    '<button class="btn btn-primary text-center" onclick="window.open(\'https://www.reddit.com/gallery/12sq3nn\', \'_blank\')">Full Catalog</button>' +
    '<button class="btn btn-primary text-center" onclick="window.open(\'https://www.reddit.com/gallery/12hjaoy\', \'_blank\')">Recommended Configs</button>' +
    '<button class="btn btn-primary text-center" onclick="window.open(\'https://www.reddit.com/r/UntitledSpaceCraft/comments/xvm0tw/untitled_space_craft_how_to_orderwhat_to_expect/\', \'_blank\')">Ordering and Shipping</button>' +
    '<div style="font-family: \'Roboto\', sans-serif;"><br></br>These controllers only work with KSP1. KSP2 compatibility is not yet available.</div>',
    showCancelButton: true,
    cancelButtonText: 'Cancel',
    buttonsStyling: false,
    showConfirmButton: false,
    customClass: {
      cancelButton: 'btn btn-danger',
    },
  });
});


//|-------------------------------|
//|     Add Container Buttons     |
//|-------------------------------|

// Add Mark V container
document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-2x4');
  addButton.addEventListener('click', () => {
    addContainer(MarkV, '.two-four');
  });
});

// Add Mark IV container
document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-2x3');
  addButton.addEventListener('click', () => {
    addContainer(MarkIV, '.two-three');
  });
});

// Add Mark III container
document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-2x2');
  addButton.addEventListener('click', () => {
    addContainer(MarkIII, '.two-two');
  });
});

// Add Mark II container
document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-1x2');
  addButton.addEventListener('click', () => {
    addContainer(MarkIhoriz, '.one-two');
  });
});

// Add Mark I container
document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-3x1');
  addButton.addEventListener('click', () => {
    addContainer(MarkII, '.three-one');
  });
});

// Add Mark I Vertical container
document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-2x1');
  addButton.addEventListener('click', () => {
    addContainer(MarkIvert, '.two-one');
  });
});


//|--------------------|
//|     Delete Bin     |
//|--------------------|

// Delete Bin drag over
deleteContainer.addEventListener('dragover', (event) => {
  event.preventDefault();
});

// Delete Bin touch start for mobile
deleteContainer.addEventListener('touchstart', function(event) {
  if (activeDraggable) {
    let tooltip = activeDraggable.querySelector(".tooltip");
    tooltip.style.display = 'none';
    event.preventDefault()
    const containers = document.querySelectorAll('.module-dock[data-type="type2"]');
    for (const container of containers) {
      const emptySlots = container.querySelectorAll('.draggable').length < 1;
        if (emptySlots) {
          container.appendChild(activeDraggable);
          /*elementToDelete.classList.remove("mouseover");
          let tooltip = activeDraggable.querySelector(".tooltip");
          tooltip.style.display = 'none';*/
          activeDraggable = null;
          break;
        }
    }
  }
  updateTotalPrice()
})

// Delete Bin drop
deleteContainer.addEventListener('drop', (event) => {
    const id = event.dataTransfer.getData('text/plain');
    const elementToDelete = document.getElementById(id);
    activeDraggable = null;
  
    // Dropped item is a container
    if (elementToDelete && (elementToDelete.classList.contains('box'))) {
      elementToDelete.remove();
      const containers = document.querySelectorAll('.module-dock[data-type="type2"]');

      // Move modules in deleted container back to the sides
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

    // Dropped item is a module
    } else if (elementToDelete && elementToDelete.classList.contains('draggable')) {
      const containers = document.querySelectorAll('.module-dock[data-type="type2"]');
      let droppedIntoContainer = false;

      // Move module back to the sides
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

    // Reset grid sizing
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

    // Update price
    updateTotalPrice()
});


//|-----------------|
//|     Modules     |
//|-----------------|

const draggables = document.querySelectorAll('.draggable')
draggables.forEach(draggable => {

  // Module Drag Start
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
    deleteContainer.classList.add('highlight');
  });
  
  // Module Drag End
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
    deleteContainer.classList.remove('highlight');
  });

  // Show tooltip
  draggable.addEventListener('mouseover', (event) => {
    const tooltip = draggable.querySelector(".tooltip");
    draggable.classList.add("mouseover");
    tooltip.style.display = 'block';

    // Determine location based on coordinates of the module
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
    if (positionv < window.innerHeight / 5) {
      tooltip.classList.remove('bottom');
      tooltip.classList.add('top');
    } else {
      tooltip.classList.remove('top');
      tooltip.classList.add('bottom');
    }

    // Update zIndex so the tooltip will stay on top of everything
    let parentContainer = draggable.parentNode;
    let parentContainerType = parentContainer.getAttribute("data-type");
    if (parentContainerType === "type1") {
      let parentContainer2 = parentContainer.parentNode;
      let parentContainer3 = parentContainer2.parentNode;
      let parentContainer4 = parentContainer3.parentNode;
      parentContainer4.style.zIndex = 70;
    }
    activeDraggable = draggable;
  });
  
  // Hide tooltip
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
});


//|-------------------------|
//|     Container Grids     |
//|-------------------------|

const containerGrids = document.querySelectorAll('.container-grid, .container-grid2');
containerGrids.forEach(containerGrid => {
  containerGrid.addEventListener('dragover', (event) => {
    event.preventDefault();
  });

  // Determine the type of container and update the class for resizing of the grid
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

    // Reset grid sizing
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

      // Drag and drop controls
      container.addEventListener('dragover', e => {
        e.preventDefault()
      })
      container.addEventListener('drop', () => {
        const draggable = document.querySelector('.dragging')
        if (draggable) {
          let childElements = container.querySelectorAll('*');
          if (childElements.length === 0) {
            container.appendChild(draggable);
            draggable.classList.remove('dragging');
          }
        }
        updateTotalPrice();
      })

      // Touch controls for mobile
      container.addEventListener('touchstart', function(event) {
        if (activeDraggable) {
          let childElements = container.querySelectorAll('*');
          if (childElements.length === 0) {
            container.appendChild(activeDraggable);
            let tooltip = activeDraggable.querySelector(".tooltip");
            tooltip.style.display = 'none';
            activeDraggable = null;
            event.preventDefault()
            updateTotalPrice()
          }
        }
      })
    })

    // Remove welcome message
    let messageElement = document.getElementById("welcome-message");
    messageElement.style.display = "none";

  // Error message if canvas is not cleared when trying to add a new container
  } else {
    Swal.fire({
      title: 'Error',
      text: 'Please drag and drop the current container either to a canvas grid or to the trash before adding a new container.',
      icon: 'error',
      showCancelButton: true,
      cancelButtonText: 'Ok',
      buttonsStyling: false,
      showConfirmButton: false,
      customClass: {
        cancelButton: 'btn btn-danger',
      },
    });
  }
}


//|------------------------|
//|     URL Parameters     |
//|------------------------|

// Load a controller from a valid URL
function loadController(inputData, color) {
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

    // Determine the container address
    const targetContainerId = containerAddress.slice(2);
    const boxes = document.querySelectorAll(containerType);
    boxes.forEach(box => {
      let parentContainer = box.parentNode;
      if (parentContainer.id.includes('canvas')) {
        if (targetContainerId!=='00') {
          box.classList.add('dropped-box');
          const targetContainer = document.getElementById(targetContainerId);
          targetContainer.insertAdjacentElement('beforeend', box);
        }

        // Get all modules and add them to the containers
        const draggables = modules.map(pair => document.getElementById(pair));
        const containers = box.querySelectorAll(`.module-dock[data-type="type1"]`);
        for (let i = 0; i < modules.length; i++) {
          const draggable = draggables[i];
          const container = containers[i];
          if (draggable) {
            container.appendChild(draggable);
          }
        }
      }

      // Set container color
      if (color) {
        box.style.borderColor = color;
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

// Load URL parameters
window.onload = function() {
  if (queryString) {
    if (queryString.startsWith('z')) {
      loadController(queryString, colorString);
    }
  }
}