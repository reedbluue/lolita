import {Char, sprites} from "./components/Char";
import {useEffect, useState} from "react";
import arrayShuffle from 'array-shuffle';
import {toast} from 'react-toastify';

const actions = [
  "Consegui tomar um banho mais curto!",
  "Fechei a torneira enquanto escovava os dentes!",
  "Fechei o chuveiro enquanto me ensabova no banho!",
  "Fechei a torneira enquanto ensaboava a louça!",
  "Tentei evitar descargas desnecessárias no banheiro!",
  "Juntei peças de roupa para lavar tudo de uma vez!",
  "Lavei o carro com balde e um pano úmido!",
  "Coletei água da chuva para limpeza doméstica!",
]

const welcome = [
  "Que bom que voltou! O que fez hoje pelo nosso planeta?",
  "Olá novamente! Vamos economizar água hoje?",
  "Estou feliz por te ver de volta!"
]

const happy = [
  "happy1",
  "happy2",
  "happy3"
] as (keyof typeof sprites)[];

const welcomeSprites = [
  "welcome1",
  "welcome2",
  "welcome3"
] as (keyof typeof sprites)[];

const congratulations = [
  "Parabéns, o planeta agradeçe!",
  "Que legal! Todos ganham com essas ações!",
  "Você é demais! Cuidar do planeta é tudo de bom né?"
]

function App() {
  const [actionsState, setActionsState] = useState<string[]>([]);
  const [char, setChar] = useState<keyof typeof sprites>("wait");

  useEffect(() => {
    let date = localStorage.getItem("date");

    if (!date) {
      date = new Date().toISOString();
      localStorage.setItem("date", date);
    }

    const localActions = localStorage.getItem("actions");

    if (!localActions) {
      const shuffle = arrayShuffle(actions);
      localStorage.setItem("actions", JSON.stringify([shuffle[0], shuffle[1], shuffle[2]]));
    } else {
      console.log(new Date(date).getDate())
      if (new Date(Date.parse(date)).getDate() !== new Date().getDate()) {
        const shuffle = arrayShuffle(actions);
        localStorage.setItem("actions", JSON.stringify([shuffle[0], shuffle[1], shuffle[2]]));
        localStorage.setItem("date", new Date().toISOString());
      }
    }

    setActionsState(JSON.parse(localStorage.getItem("actions") || "[]"));
  }, []);

  useEffect(() => {
    const init = async () => {
      const firstVisit = localStorage.getItem("firstVisit");
      if (!firstVisit) {
        const shuffle = arrayShuffle(welcomeSprites);
        setChar(shuffle[0]);

        toast.info("Olá, me chamo Lolita. Posso te ajudar com dicas para a economia de água!");
        toast.info("Todos os dias darei três dicas para você. Tente ao menos completar 1 por dia.");
        toast("Sempre que completar algo, clique sobre a tarefa para me contar.");
        toast.info("Confio em você para ajudar a cuidar melhor do nosso planeta!", {
          onClose: () => localStorage.setItem("firstVisit", "true")
        });
      } else {
        const localActions = JSON.parse(localStorage.getItem("actions") || "[]");
        if (localActions.length > 0) {
          const shuffle = arrayShuffle(welcome);
          toast.info(shuffle[0]);
        } else {
          const shuffle = arrayShuffle(happy);
          setChar(shuffle[0]);
          toast.info("Você completou todas as tarefas de hoje. Parabéns!");
        }
      }
    }
    init();
  }, []);

  const removeAction = (action: string) => {
    const item = localStorage.getItem("firstVisit");
    if (!item) return;
    toast.dismiss();
    const result = JSON.parse(localStorage.getItem("actions") || "[]") as string[];
    const removed = result.filter(a => a !== action);
    localStorage.setItem("actions", JSON.stringify(removed));
    setActionsState(removed);

    const shuffle = arrayShuffle(happy);
    setChar(shuffle[0]);

    const shuffle2 = arrayShuffle(congratulations);
    toast.info(shuffle2[0]);
  }

  return (
      <>
        <main className="h-screen w-screen bg-blue-700 flex flex-col items-center">
          <section className={"flex flex-col justify-center items-center p-5 text-2xl max-w-[600px]"}>
            <h1>Poupe água com a Lolita!</h1>
          </section>
          <section className={"flex flex-col justify-center items-center flex-grow max-w-[600px]"}>
            <Char type={char}/>
          </section>

          <section className={"mb-2 px-2 flex flex-col justify-center max-w-[600px]"}>
            <h4 className="text-xl mb-2 text-center" hidden={actionsState.length === 0}>Conte para a Lolita o
              que você conseguiu fazer hoje:</h4>
            <h4 className="text-xl mb-2 text-center" hidden={actionsState.length != 0}>Você completou todas as
              tarefas! Parabéns!</h4>
            <table className="w-full">
              <tbody className="flex flex-col gap-2">
              {actionsState.map(a => (
                  <tr key={a} onClick={() => removeAction(a)}
                      className="cursor-pointer bg-white border-2 rounded-2xl text-center py-2 px-4 select-none">
                    <td>
                      <h1>{a}</h1>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
          </section>
        </main>
      </>
  )
}

export default App
