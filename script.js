const draggables = document.querySelectorAll('.draggable')

const priceDisplay2 = document.getElementById('price-display2')


function updateTotalPrice() {
  let totalPrice = 0
  const containerBoxes = document.querySelectorAll('.two-four');
  containerBoxes.forEach(containerBox => {
    const price = parseFloat(containerBox.dataset.price);
    totalPrice += price;
  });
  const containerBoxes2 = document.querySelectorAll('.two-three');
  containerBoxes2.forEach(containerBox => {
    const price = parseFloat(containerBox.dataset.price);
    totalPrice += price;
  });
  const containerBoxes3 = document.querySelectorAll('.two-two');
  containerBoxes3.forEach(containerBox => {
    const price = parseFloat(containerBox.dataset.price);
    totalPrice += price;
  });
  const containerBoxes4 = document.querySelectorAll('.one-two');
  containerBoxes4.forEach(containerBox => {
    const price = parseFloat(containerBox.dataset.price);
    totalPrice += price;
  });
  const containerBoxes5 = document.querySelectorAll('.three-one');
  containerBoxes5.forEach(containerBox => {
    const price = parseFloat(containerBox.dataset.price);
    totalPrice += price;
  });
  const type1Containers = document.querySelectorAll('.container[data-type="type1"]')
  type1Containers.forEach(container => {
    const draggablesInContainer = container.querySelectorAll('.draggable')
    draggablesInContainer.forEach(draggable => {
      const price = parseFloat(draggable.dataset.price)
      totalPrice += price
    })
  })
  priceDisplay2.innerText = `Total Price: $${parseInt(totalPrice.toFixed(2))}`
}

draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', function(event) {
    draggable.classList.add('dragging')
    const price = this.dataset.price
    const priceDisplay = document.getElementById('price-display')
    priceDisplay.innerText = `Last Module: $${price}`
    event.dataTransfer.setData('text/plain', this.id);
  })

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging')
    const priceDisplay = document.querySelector('.price-display')
    if (priceDisplay) {
      priceDisplay.remove()
    }
    updateTotalPrice()
  })
})




// Get the container-box element


// Get the container-grid element
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
    const pageWrapper = document.getElementById('page-wrapper');
  
    addButton.addEventListener('click', () => {
        const containerBoxHTML = `
        <div id="two-four-box" class="two-four" data-price="120" draggable="true">
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
      
        const containerBoxElement = document.createElement('div');
        containerBoxElement.innerHTML = containerBoxHTML.trim();
        const containerBox = containerBoxElement.firstChild;
        pageWrapper.appendChild(containerBox);


        const price = containerBox.dataset.price
        const priceDisplay = document.getElementById('price-display')
        priceDisplay.innerText = `Last Module: $${price}`
        updateTotalPrice()

        
        const containerBoxes = document.querySelectorAll('.two-four');
        containerBoxes.forEach(containerBox => {
            containerBox.addEventListener('dragstart', (event) => {
                if (event.target.id === "two-four-box") {
                    event.dataTransfer.setData('dragged', event.target.id);
                    event.target.classList.add('dragging2');
                    const id = event.target.id;
                    event.dataTransfer.setData('text/plain', id);
                }
            });
              
                containerBox.addEventListener('dragend', (event) => {
                event.target.classList.remove('dragging2');
            });
        });

        const containers = document.querySelectorAll('.container')
        containers.forEach(container => {
            container.addEventListener('dragover', e => {
              e.preventDefault()
            })
          
            container.addEventListener('drop', () => {
                const draggable = document.querySelector('.dragging')
                const type = container.dataset.type
                if ((type === 'type1') && (draggable)) {
                    const price = parseFloat(draggable.dataset.price)
                    const priceDisplay = document.getElementById('price-display2')
                    priceDisplay.innerText = `Total Price: $${(price + parseInt(parseFloat(priceDisplay2.innerText.slice(1))).toFixed(2))}`
                }
                container.appendChild(draggable)
                draggable.classList.remove('dragging');
                updateTotalPrice()
            })
        })
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-2x3');
    const pageWrapper = document.getElementById('page-wrapper');
  
    addButton.addEventListener('click', () => {
        const containerBoxHTML = `
        <div id="two-three-box" class="two-three" data-price="90" draggable="true">
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
      
        const containerBoxElement = document.createElement('div');
        containerBoxElement.innerHTML = containerBoxHTML.trim();
        const containerBox = containerBoxElement.firstChild;
        pageWrapper.appendChild(containerBox);

        const price = containerBox.dataset.price
        const priceDisplay = document.getElementById('price-display')
        priceDisplay.innerText = `Last Module: $${price}`
        updateTotalPrice()



        const containerBoxes = document.querySelectorAll('.two-three');
        containerBoxes.forEach(containerBox => {
            containerBox.addEventListener('dragstart', (event) => {
                if (event.target.id === "two-three-box") {
                    event.dataTransfer.setData('dragged', event.target.id);
                    event.target.classList.add('dragging2');
                    const id = event.target.id;
                    event.dataTransfer.setData('text/plain', id);
                }
            });
              
                containerBox.addEventListener('dragend', (event) => {
                event.target.classList.remove('dragging2');
            });
        });

        const containers = document.querySelectorAll('.container')
        containers.forEach(container => {
            container.addEventListener('dragover', e => {
              e.preventDefault()
            })
          
            container.addEventListener('drop', () => {
              const draggable = document.querySelector('.dragging')
              const type = container.dataset.type
              if (type === 'type1') {
                const price = parseFloat(draggable.dataset.price)
                const priceDisplay = document.getElementById('price-display2')
                priceDisplay.innerText = `Total Price: $${(price + parseInt(parseFloat(priceDisplay2.innerText.slice(1))).toFixed(2))}`
              }
              container.appendChild(draggable)
              draggable.classList.remove('dragging');
              updateTotalPrice()
            })
        })
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-2x2');
    const pageWrapper = document.getElementById('page-wrapper');
  
    addButton.addEventListener('click', () => {
        const containerBoxHTML = `
        <div id="two-two-box" class="two-two" data-price="70" draggable="true">
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
      
        const containerBoxElement = document.createElement('div');
        containerBoxElement.innerHTML = containerBoxHTML.trim();
        const containerBox = containerBoxElement.firstChild;
        pageWrapper.appendChild(containerBox);

        const price = containerBox.dataset.price
        const priceDisplay = document.getElementById('price-display')
        priceDisplay.innerText = `Last Module: $${price}`
        updateTotalPrice()



        const containerBoxes = document.querySelectorAll('.two-two');
        containerBoxes.forEach(containerBox => {
            containerBox.addEventListener('dragstart', (event) => {
                if (event.target.id === "two-two-box") {
                    event.dataTransfer.setData('dragged', event.target.id);
                    event.target.classList.add('dragging2');
                    const id = event.target.id;
                    event.dataTransfer.setData('text/plain', id);
                }
            });
              
                containerBox.addEventListener('dragend', (event) => {
                event.target.classList.remove('dragging2');
            });
        });

        const containers = document.querySelectorAll('.container')
        containers.forEach(container => {
            container.addEventListener('dragover', e => {
              e.preventDefault()
            })
          
            container.addEventListener('drop', () => {
              const draggable = document.querySelector('.dragging')
              const type = container.dataset.type
              if (type === 'type1') {
                const price = parseFloat(draggable.dataset.price)
                const priceDisplay = document.getElementById('price-display2')
                priceDisplay.innerText = `Total Price: $${(price + parseInt(parseFloat(priceDisplay2.innerText.slice(1))).toFixed(2))}`
              }
              container.appendChild(draggable)
              draggable.classList.remove('dragging');
              updateTotalPrice()
            })
        })
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-1x2');
    const pageWrapper = document.getElementById('page-wrapper');
  
    addButton.addEventListener('click', () => {
        const containerBoxHTML = `
        <div id="one-two-box" class="one-two" data-price="50" draggable="true">
          <div class="container-wrapper">
            <div class="container" data-type="type1" style="background-image: url('containers/angled.png'); background-size: cover;"></div>
            <div class="container" data-type="type1" style="background-image: url('containers/angled.png'); background-size: cover;"></div>
          </div>
        </div>
        `;
      
        const containerBoxElement = document.createElement('div');
        containerBoxElement.innerHTML = containerBoxHTML.trim();
        const containerBox = containerBoxElement.firstChild;
        pageWrapper.appendChild(containerBox);

        const price = containerBox.dataset.price
        const priceDisplay = document.getElementById('price-display')
        priceDisplay.innerText = `Last Module: $${price}`
        updateTotalPrice()



        const containerBoxes = document.querySelectorAll('.one-two');
        containerBoxes.forEach(containerBox => {
            containerBox.addEventListener('dragstart', (event) => {
                if (event.target.id === "one-two-box") {
                    event.dataTransfer.setData('dragged', event.target.id);
                    event.target.classList.add('dragging2');
                    const id = event.target.id;
                    event.dataTransfer.setData('text/plain', id);
                }
            });
              
                containerBox.addEventListener('dragend', (event) => {
                event.target.classList.remove('dragging2');
            });
        });

        const containers = document.querySelectorAll('.container')
        containers.forEach(container => {
            container.addEventListener('dragover', e => {
              e.preventDefault()
            })
          
            container.addEventListener('drop', () => {
              const draggable = document.querySelector('.dragging')
              const type = container.dataset.type
              if (type === 'type1') {
                const price = parseFloat(draggable.dataset.price)
                const priceDisplay = document.getElementById('price-display2')
                priceDisplay.innerText = `Total Price: $${(price + parseInt(parseFloat(priceDisplay2.innerText.slice(1))).toFixed(2))}`
              }
              container.appendChild(draggable)
              draggable.classList.remove('dragging');
              updateTotalPrice()
            })
        })
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-3x1');
    const pageWrapper = document.getElementById('page-wrapper');
  
    addButton.addEventListener('click', () => {
        const containerBoxHTML = `
        <div id="three-one-box" class="three-one" data-price="60" draggable="true">
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
      
        const containerBoxElement = document.createElement('div');
        containerBoxElement.innerHTML = containerBoxHTML.trim();
        const containerBox = containerBoxElement.firstChild;
        pageWrapper.appendChild(containerBox);

        const price = containerBox.dataset.price
        const priceDisplay = document.getElementById('price-display')
        priceDisplay.innerText = `Last Module: $${price}`
        updateTotalPrice()



        const containerBoxes = document.querySelectorAll('.three-one');
        containerBoxes.forEach(containerBox => {
            containerBox.addEventListener('dragstart', (event) => {
                if (event.target.id === "three-one-box") {
                    event.dataTransfer.setData('dragged', event.target.id);
                    event.target.classList.add('dragging2');
                    const id = event.target.id;
                    event.dataTransfer.setData('text/plain', id);
                }
            });
              
                containerBox.addEventListener('dragend', (event) => {
                event.target.classList.remove('dragging2');
            });
        });

        const containers = document.querySelectorAll('.container')
        containers.forEach(container => {
            container.addEventListener('dragover', e => {
              e.preventDefault()
            })
          
            container.addEventListener('drop', () => {
              const draggable = document.querySelector('.dragging')
              const type = container.dataset.type
              if (type === 'type1') {
                const price = parseFloat(draggable.dataset.price)
                const priceDisplay = document.getElementById('price-display2')
                priceDisplay.innerText = `Total Price: $${(price + parseInt(parseFloat(priceDisplay2.innerText.slice(1))).toFixed(2))}`
              }
              container.appendChild(draggable)
              draggable.classList.remove('dragging');
              updateTotalPrice()
            })
        })
    });
});







const deleteContainer = document.getElementById('delete-container');
deleteContainer.addEventListener('dragover', (event) => {
  event.preventDefault();
});

deleteContainer.addEventListener('drop', (event) => {
    const id = event.dataTransfer.getData('text/plain');
    const elementToDelete = document.getElementById(id);
  
    if (elementToDelete && (elementToDelete.classList.contains('two-three') || elementToDelete.classList.contains('two-four') || elementToDelete.classList.contains('two-two') || elementToDelete.classList.contains('one-two') || elementToDelete.classList.contains('three-one'))) {
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

      }
    });
    updateTotalPrice()
});