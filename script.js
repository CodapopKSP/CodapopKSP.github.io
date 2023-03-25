const draggables = document.querySelectorAll('.draggable')
const priceDisplay2 = document.getElementById('price-display2')
const deleteContainer = document.getElementById('delete-container');

function updateTotalPrice() {
  let totalPrice = 0
  const containerBoxes = document.querySelectorAll('.box');
  containerBoxes.forEach(containerBox => {
    const price = parseFloat(containerBox.dataset.price);
    totalPrice += price;
  });
  const type1Containers = document.querySelectorAll('.container[data-type="type1"]');
  type1Containers.forEach(container => {
    const draggablesInContainer = container.querySelectorAll('.draggable');
    draggablesInContainer.forEach(draggable => {
      const price = parseFloat(draggable.dataset.price);
      totalPrice += price;
    });
  });
  priceDisplay2.innerText = `Total: $${parseInt(totalPrice.toFixed(2))}`;
};

draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', function(event) {
    draggable.classList.add('dragging');
    event.dataTransfer.setData('text/plain', this.id);
    var tooltip = draggable.querySelector(".tooltip");
    tooltip.style.display = 'none';
    var parentContainer = draggable.parentNode;
    var parentContainerType = parentContainer.getAttribute("data-type");
    if (parentContainerType === "type1") {
      var parentContainer2 = parentContainer.parentNode;
      var parentContainer3 = parentContainer2.parentNode;
      var parentContainer4 = parentContainer3.parentNode;
      parentContainer4.style.zIndex = '';
    }
  });

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging');
    updateTotalPrice();
    var parentContainer = draggable.parentNode;
    var parentContainerType = parentContainer.getAttribute("data-type");
    if (parentContainerType === "type1") {
      var parentContainer2 = parentContainer.parentNode;
      var parentContainer3 = parentContainer2.parentNode;
      var parentContainer4 = parentContainer3.parentNode;
      parentContainer4.style.zIndex = '';
    }
  });
  
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

    var parentContainer = draggable.parentNode;
    var parentContainerType = parentContainer.getAttribute("data-type");
    if (parentContainerType === "type1") {
      var parentContainer2 = parentContainer.parentNode;
      var parentContainer3 = parentContainer2.parentNode;
      var parentContainer4 = parentContainer3.parentNode;
      parentContainer4.style.zIndex = 70;
    }
  });
  
  draggable.addEventListener('mouseout', () => {
    var tooltip = draggable.querySelector(".tooltip");
    tooltip.style.display = 'none';
    draggable.classList.remove("mouseover");
    var parentContainer = draggable.parentNode;
    var parentContainerType = parentContainer.getAttribute("data-type");
    if (parentContainerType === "type1") {
      var parentContainer2 = parentContainer.parentNode;
      var parentContainer3 = parentContainer2.parentNode;
      var parentContainer4 = parentContainer3.parentNode;
      parentContainer4.style.zIndex = '';
    }
  });
});

const lightSwitch = document.getElementById('light-switch')

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

const containerGrids = document.querySelectorAll('.container-grid, .container-grid2');

containerGrids.forEach(containerGrid => {
  containerGrid.addEventListener('dragover', (event) => {
    event.preventDefault();
  });

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

    const containers = document.querySelectorAll('.container2');
    containers.forEach(container => {
      const containerChildren = container.children;
      if (containerChildren.length === 0) {
        container.classList.remove('has-24child');
        container.classList.remove('has-23child');
        container.classList.remove('has-22child');
        container.classList.remove('has-12child');
        container.classList.remove('has-31child');
      }
    });
  });
});

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

deleteContainer.addEventListener('dragover', (event) => {
  event.preventDefault();
});

deleteContainer.addEventListener('drop', (event) => {
    const id = event.dataTransfer.getData('text/plain');
    const elementToDelete = document.getElementById(id);
  
    if (elementToDelete && (elementToDelete.classList.contains('box'))) {
        elementToDelete.remove();
        const containers = document.querySelectorAll('.container[data-type="type2"]');
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
    } else if (elementToDelete && elementToDelete.classList.contains('draggable')) {
        const containers = document.querySelectorAll('.container[data-type="type2"]');
        let droppedIntoContainer = false;
        for (const container of containers) {
          const emptySlots = container.querySelectorAll('.draggable').length < 1;
            if (emptySlots) {
                container.appendChild(elementToDelete);
                elementToDelete.classList.remove("mouseover");
                var tooltip = elementToDelete.querySelector(".tooltip");
                tooltip.style.display = 'none';
                droppedIntoContainer = true;
                break;
            }
        }
    }
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

function addContainer(containerData, type) {
    const existingBoxes = document.querySelectorAll('.dropped-box');
    const requiredBoxes = document.querySelectorAll('.box');
      if (existingBoxes.length === requiredBoxes.length) {
        const counter = Math.floor(Math.random() * 10000).toString();
        const containerBoxHTML = `<div id="${counter}" ${containerData}`;
      
        const containerBoxElement = document.createElement('div');
        containerBoxElement.innerHTML = containerBoxHTML.trim();
        const containerBox = containerBoxElement.firstChild;
        const pageWrapper = document.getElementById('page-wrapper');
        pageWrapper.appendChild(containerBox);
        updateTotalPrice()

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

        const containers = document.querySelectorAll('.container')
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
        })

        var messageElement = document.getElementById("welcome-message");
        messageElement.style.display = "none";
  } else {
    alert("Please drag and drop the current container either to a canvas grid or to the trash before adding a new container.");
  }
}


const MarkIhoriz = `
        class="one-two box" data-price="50" draggable="true">
          <div class="container-wrapper">
            <div class="container" data-type="type1" style="background-image: url('containers/angled.png'); background-size: cover;"></div>
            <div class="container" data-type="type1" style="background-image: url('containers/angled.png'); background-size: cover;"></div>
          </div>
        </div>
        `;

const MarkIvert = `
        class="two-one box" data-price="50" draggable="true">
          <div class="container-wrapper">
            <div class="container" data-type="type1" style="background-image: url('containers/angled.png'); background-size: cover;"></div>
          </div>
          <div class="container-wrapper">
            <div class="container" data-type="type1" style="background-image: url('containers/level.png'); background-size: cover;"></div>
          </div>
        </div>
        `;

const MarkII = `
        class="three-one box" data-price="60" draggable="true">
          <div class="container-wrapper">
            <div class="container" data-type="type1" style="background-image: url('containers/angled.png'); background-size: cover;"></div>
          </div>
          <div class="container-wrapper">
            <div class="container" data-type="type1" style="background-image: url('containers/level.png'); background-size: cover;"></div>
          </div>
          <div class="container-wrapper">
            <div class="container" data-type="type1" style="background-image: url('containers/level.png'); background-size: cover;"></div>
          </div>
        </div>
        `;

const MarkIII = `
        class="two-two box" data-price="70" draggable="true">
          <div class="container-wrapper">
            <div class="container" data-type="type1" style="background-image: url('containers/angled.png'); background-size: cover;"></div>
            <div class="container" data-type="type1" style="background-image: url('containers/angled.png'); background-size: cover;"></div>
          </div>
          <div class="container-wrapper">
            <div class="container" data-type="type1" style="background-image: url('containers/level.png'); background-size: cover;"></div>
            <div class="container" data-type="type1" style="background-image: url('containers/level.png'); background-size: cover;"></div>
          </div>
        </div>
        `;

const MarkIV = `
        class="two-three box" data-price="90" draggable="true">
          <div class="container-wrapper">
            <div class="container" data-type="type1" style="background-image: url('containers/angled.png'); background-size: cover;"></div>
            <div class="container" data-type="type1" style="background-image: url('containers/angled.png'); background-size: cover;"></div>
            <div class="container" data-type="type1" style="background-image: url('containers/angled.png'); background-size: cover;"></div>
          </div>
          <div class="container-wrapper">
            <div class="container" data-type="type1" style="background-image: url('containers/level.png'); background-size: cover;"></div>
            <div class="container" data-type="type1" style="background-image: url('containers/level.png'); background-size: cover;"></div>
            <div class="container" data-type="type1" style="background-image: url('containers/level.png'); background-size: cover;"></div>
          </div>
        </div>
        `;

const MarkV = `
        class="two-four box" data-price="120" draggable="true">
          <div class="container-wrapper">
            <div class="container" data-type="type1" style="background-image: url('containers/angled.png'); background-size: cover;"></div>
            <div class="container" data-type="type1" style="background-image: url('containers/angled.png'); background-size: cover;"></div>
            <div class="container" data-type="type1" style="background-image: url('containers/angled.png'); background-size: cover;"></div>
            <div class="container" data-type="type1" style="background-image: url('containers/angled.png'); background-size: cover;"></div>
          </div>
          <div class="container-wrapper">
            <div class="container" data-type="type1" style="background-image: url('containers/level.png'); background-size: cover;"></div>
            <div class="container" data-type="type1" style="background-image: url('containers/level.png'); background-size: cover;"></div>
            <div class="container" data-type="type1" style="background-image: url('containers/level.png'); background-size: cover;"></div>
            <div class="container" data-type="type1" style="background-image: url('containers/level.png'); background-size: cover;"></div>
          </div>
        </div>
        `;