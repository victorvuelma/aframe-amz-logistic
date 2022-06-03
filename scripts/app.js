const allBoxes = document.querySelectorAll("[id^='box_']");

const boxesOne = document.querySelectorAll("[id^='box_sm_r']");
const boxesTwo = document.querySelectorAll("[id^='box_md_r']");
const boxesTree = document.querySelectorAll("[id^='box_lg_r']");

const boxesFour = document.querySelectorAll("[id^='box_sm_l']");
const boxesFive = document.querySelectorAll("[id^='box_lg_l']");

const boxHighlight = document.querySelector("#highlight");
const instructions = document.querySelector("#instructions");

const computer = document.querySelector("#computer");

const boxesOptions = {
  1: boxesOne,
  2: boxesTwo,
  3: boxesTree,
  4: boxesFour,
  5: boxesFive,
};

let boxesToPickup = {};

computer.addEventListener("click", () => {
  const pickupBoxesAmount = _random(3);
  boxesToPickup = {};

  const boxesOptionsToPickup = [];
  for (let i = 0; i <= pickupBoxesAmount; i++) {
    const option = _random(5) + 1;

    boxesOptionsToPickup.push(option);
  }

  boxesOptionsToPickup.forEach(
    (box) => (boxesToPickup[box] = _random(boxesOptions[box].length - 1) + 1)
  );

  allBoxes.forEach((box) => {
    box.setAttribute("visible", true);
    box.classList.add("clickable");
  });

  _updatePickup();
});

Object.entries(boxesOptions).forEach(([option, boxes]) => {
  option = Number(option);

  boxes.forEach((box) => {
    box.addEventListener("mouseenter", () => {
      if (box.getAttribute("visible") !== false) {
        const scale = box.getAttribute("scale").x;

        boxHighlight.setAttribute("geometry", {
          height: 1.5 * scale + 0.05,
          width: 1.25 * scale + 0.05,
          depth: 1.25 * scale + 0.05,
        });

        boxHighlight.setAttribute("rotation", box.getAttribute("rotation"));

        boxHighlight.setAttribute("position", box.getAttribute("position"));
        boxHighlight.setAttribute("highlitedBoxOption", option);

        boxHighlight.setAttribute("visible", true);
      }
    });

    box.addEventListener("mouseleave", () =>
      boxHighlight.setAttribute("visible", false)
    );

    box.addEventListener("click", () => {
      if (box.getAttribute("visible") !== false) {
        if (!boxesToPickup[option] || boxesToPickup[option] < 1) {
          return;
        }
        boxesToPickup[option]--;

        box.setAttribute("visible", false);
        box.classList.remove("clickable");

        boxHighlight.setAttribute("visible", false);

        _updatePickup();
      }
    });
  });
});

const _updatePickup = () => {
  console.log(boxesToPickup);
  if (Object.values(boxesToPickup).some((amount) => amount > 0)) {
    const pickup = [];

    Object.entries(boxesToPickup).forEach(([option, amount]) => {
      if (amount > 0) {
        if (amount == 1) {
          pickup.push(`- 1 caixa na prateleira ${option}`);
        } else {
          pickup.push(`- ${amount} caixas na prateleira ${option}`);
        }
      }
    });

    instructions.setAttribute(
      "value",
      `Voce ainda precisa pegar: \n \n ${pickup.join(
        "\n"
      )} \n \n Ao terminar de pegar as caixas, o treinamento é encerrado.`
    );
  } else {
    instructions.setAttribute(
      "value",
      "Voce pegou todas as caixas, clique no computador para reiniciar o treinamento."
    );
  }
};

const _random = (max) => Math.floor(Math.random() * max);
