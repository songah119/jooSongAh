import pic1 from "./assets/김규민.jpeg";
import pic2 from "./assets/전희선.jpeg";
import pic3 from "./assets/서혜은.jpg";
import pic4 from "./assets/황주희.jpeg";
import pic5 from "./assets/백지연.png";

const $ = (selector) => document.querySelector(selector);

let currentStep = 0;

const quizList = [
  {
    src: pic1,
    answer: "김규민",
  },
  {
    src: pic2,
    answer: "전희선",
  },
  {
    src: pic3,
    answer: "서혜은",
  },
  {
    src: pic4,
    answer: "황주희",
  },
  {
    src: pic5,
    answer: "백지연",
  },
];

function initGame(score,image) {
  currentStep=0;
  score.innerText=0;
  image.src=quizList[currentStep].src;
}

function gameManager(gameInfo){
  const {score,image}=gameInfo;
  initGame(score,image);
  attachEvent(gameInfo);
}

window.onload =() =>{
  gameManager({
    score: $('.scoreBoard__score'),
    answer:$('ul.answer__list'),
    image: $('.imageBoard > img'),
    returnBtn: $('.buttonList__shuffle'),
  });
};

function showModal(modalContent,keepOpen){ //modal 보이기
  const modal= $('.modal');
  const modalBody=  $('p.modal__body');
  modalBody.innerHTML= modalContent; //태그안의 내용을 바꾸는 방법
  modal.classList.remove('hide');

  if(keepOpen) return; //단계가 끝났을 때 메인화면으로 모달
  setTimeout(()=>{
    modal.classList.add('hide');
  }, 500);
}


function attachEvent({score,answer,image,returnBtn}){
  answer.addEventListener('click', (e) =>{
    if(e.target instanceof HTMLElement){
      const currentAnswer = e.target.innerText; //li 내부텍스트를 currentAnswer로 받아오기
      const realAnswer = quizList[currentStep].answer;
      if(currentAnswer === realAnswer){ //정답
        goNextStep(score,image);
      }else { //오답
        showModal(`${currentAnswer}(이)가 아니야😕`);
      }
    }
  });
  returnBtn.addEventListener('click', () =>{
    initGame(score,image);
  });
}

function goNextStep(score, image){ //점수 올리고, 이미지 바꿔주기
  score.innerText= +score.innerText+1;
  currentStep++;
  if(currentStep === quizList.length){ //게임이 끝났을 때
    showModal(`
    <a href="/">메인화면으로</a>
    `,true);
    return;
  }
  showModal('나를 알아주다니 고마워💕');
  image.src=quizList[currentStep].src; //이미지를 현재스탭에 맞게 가져오기
}


