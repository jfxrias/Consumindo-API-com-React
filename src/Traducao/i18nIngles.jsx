import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  pt: {
    translation: {
      // Configurações
      settings: "Painel de Configurações",
      account: "Conta",
      newPassword: "Nova senha",
      changePassword: "Alterar Senha",
      login: "Login",
      updateProfile: "Atualizar Perfil",
      language: "Idioma",
      categories: "Categorias",
      categoryName: "Nome da categoria",
      categoryColor: "Cor da categoria",
      createCategory: "Criar Categoria",
      languageChanged: "Idioma alterado com sucesso!",
      errorChangePassword: "Erro ao alterar senha",
      errorUpdateProfile: "Erro ao atualizar perfil",
      errorCreateCategory: "Erro ao criar categoria",
      errorChangeLanguage: "Erro ao mudar idioma",

      // NavBar
      home: "Home",
      myNotes: "Minhas Notas",
      darkMode: "Escuro",
      logout: "Sair",

      // Home
      homeTitle: "Minhas Notas",
      notesCountSingular: "nota",
      notesCountPlural: "notas",
      noNotesFound: "Nenhuma nota encontrada",
      noNotesYet: "Nenhuma nota ainda",
      tryOtherFilters: "Tente outros termos ou categorias.",
      createFirstNote: "Crie sua primeira nota para começar.",
      clearFilters: "Limpar filtros",

      // Minhas Notas
      mural: "Mural",
      addNote: "Adicionar Nota",
      save: "Salvar",
      cancel: "Cancelar",
      delete: "Excluir",
      edit: "Editar",
      emptyTextAlert: "O campo de texto não pode estar vazio!"
    }
  },
  en: {
    translation: {
      // Settings
      settings: "Settings Panel",
      account: "Account",
      newPassword: "New password",
      changePassword: "Change Password",
      login: "Login",
      updateProfile: "Update Profile",
      language: "Language",
      categories: "Categories",
      categoryName: "Category name",
      categoryColor: "Category color",
      createCategory: "Create Category",
      languageChanged: "Language changed successfully!",
      errorChangePassword: "Error changing password",
      errorUpdateProfile: "Error updating profile",
      errorCreateCategory: "Error creating category",
      errorChangeLanguage: "Error changing language",

      // NavBar
      home: "Home",
      myNotes: "My Notes",
      darkMode: "Dark",
      logout: "Logout",

      // Home
      homeTitle: "My Notes",
      notesCountSingular: "note",
      notesCountPlural: "notes",
      noNotesFound: "No notes found",
      noNotesYet: "No notes yet",
      tryOtherFilters: "Try other terms or categories.",
      createFirstNote: "Create your first note to start.",
      clearFilters: "Clear filters",

      // My Notes
      mural: "Board",
      addNote: "Add Note",
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      emptyTextAlert: "Text field cannot be empty!"
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "pt", // idioma inicial
  interpolation: { escapeValue: false }
});

export default i18n;
