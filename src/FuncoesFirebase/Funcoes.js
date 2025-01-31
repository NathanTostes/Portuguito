import { FIREBASE_APP } from "../../FirebaseConfig";
import { doc, getFirestore, where } from "firebase/firestore";
import { collection, query, getDocs, deleteDoc, updateDoc, } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { differenceInCalendarDays } from "date-fns";

export const fetchIdList = async (campo, colecao, item, usuario) => {
  const db = getFirestore(FIREBASE_APP);
  const collectionRef = collection(db, colecao);

  const alunoRef = doc(getFirestore(), `/users/${usuario}`);

  try {
    const q = query(
      collectionRef,
      where("aluno", "==", alunoRef),
      where(campo, "==", item)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const primeiroDocumento = querySnapshot.docs[0];
      const dados = primeiroDocumento.data();
      const idDoDocumento = primeiroDocumento.id;

      return idDoDocumento;
    } else {
      console.log("Nenhum documento encontrado com base no título.");
    }
  } catch (error) {
    console.error("Erro ao obter dados do documento:", error);
  }
};

export const fetchQuestionIdByTitle = async (title, collectionName, userId) => {
  const db = getFirestore(FIREBASE_APP);
  try {
    // Cria a consulta para buscar a questão com base no título e no usuário
    const q = query(
      collection(db, collectionName),
      where("nomeLista", "==", title),
      where("criador", "==", userId)
    );

    // Executa a consulta
    const querySnapshot = await getDocs(q);

    // Verifica se há resultados
    if (!querySnapshot.empty) {
      // Retorna o ID da primeira questão encontrada
      const firstQuestion = querySnapshot.docs[0];
      return firstQuestion.id;
    } else {
      console.log("Nenhuma questão encontrada com o título fornecido.");
      return null; // Retorna null se não encontrar nenhuma questão
    }
  } catch (error) {
    console.error("Erro ao buscar o ID da questão:", error);
    return null; // Retorna null em caso de erro
  }
};

export const validateListName = async (newListName, currentUserReference) => {
  if (newListName === '') {
    throw new Error("lista criada não possui nome");
  }

  const listasCollection = collection(getFirestore(), "listas");
  const listasQuery = query(listasCollection, where("criador", "==", currentUserReference));

  const listasSnapshot = await getDocs(listasQuery);

  listasSnapshot.forEach((doc) => {
    const listaData = doc.data();
    if (listaData.nomeLista === newListName) {
      throw new Error("lista de mesmo nome já existente");
    }
  });
}

export const deleteList = async (listId) => {
  const db = getFirestore();

  try {
    const docRef = doc(db, 'listas', listId);

    try {
      await deleteDoc(docRef);
    } catch (error) {
      throw new Error('Erro ao excluir a lista: ' + error);
    }
  } catch (error) {
    console.log(error);
  }
};

export const userReference = async () => {
  const auth = getAuth();

  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // O usuário está autenticado
        const usuarioId = user.uid;
        const usuarioReference = doc(getFirestore(), `users/${usuarioId}`);
        resolve(usuarioReference);
      } else {
        // O usuário não está autenticado
        reject("Usuário não autenticado");
      }
    });
  });
};

export const userVerification = async (email) => {
  const db = getFirestore(FIREBASE_APP);

  const docRef = collection(db, "users");
  const q = query(docRef, where("email", "==", email));

  const querySnapshot = await getDocs(q);

  const userDoc = querySnapshot.docs[0].data();
  const isProfessor = userDoc.souProfessor;

  if (isProfessor) {
    return 'teacher';
  }

  return 'student';
};

export const getInfoUser = async (email) => {
  const db = getFirestore(FIREBASE_APP);

  const docRef = collection(db, "users");
  const q = query(docRef, where("email", "==", email));

  const querySnapshot = await getDocs(q);

  if (querySnapshot.size > 0) {
    const userDoc = querySnapshot.docs[0].data();

    return userDoc;
  }

  // Se não houver documento correspondente, retorne false (ou o valor que fizer sentido para o seu caso)
  return false;
};

export const updateSequenceDays = async (email) => {
  const db = getFirestore(FIREBASE_APP);
  const dataAtual = new Date();

  try {
    // Consultar o usuário pelo e-mail
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.size > 0) {
      const usuarioDoc = querySnapshot.docs[0];
      const usuario = usuarioDoc.data();
      const usuarioRef = doc(db, "users", usuarioDoc.id);

      const ultimoAcesso = usuario.ultimoAcesso ? usuario.ultimoAcesso.toDate() : null;

      let novaSequenciaDias = usuario.sequenciaDias || 0;

      if (ultimoAcesso) {
        const diferencaEmDias = differenceInCalendarDays(dataAtual, ultimoAcesso);

        if (diferencaEmDias === 1) {
          novaSequenciaDias += 1; // Incrementa a sequência
        } else if (diferencaEmDias > 1) {
          novaSequenciaDias = 0; // Reinicia a sequência
        }
      } else {
        // Primeiro login ou sem data de último acesso
        novaSequenciaDias = 0;
      }

      // Atualiza o Firestore
      await updateDoc(usuarioRef, {
        ultimoAcesso: dataAtual,
        sequenciaDias: novaSequenciaDias,
      });
    }
  } catch (error) {
    console.error("Erro ao atualizar a sequência de dias:", error);
  }
};
