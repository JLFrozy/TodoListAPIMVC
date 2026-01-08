import { describe, it, expect, vi } from "vitest";
import CtrlTodo from "./controllers/todoController.js";
describe("Contrôleur Todo", () => {
  it("readTodos doit retourner la liste des todos", () => {
    // On simule les objets req et res d’Express
    const req = {};
    const res = { json: vi.fn() }; // espion pour vérifier que res.json a été appelé
    const ctrl = new CtrlTodo();
    ctrl.getAllTodos(req, res);
    // On vérifie que res.json a été appelé avec un objet contenant les bonnes propriétés
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        data: expect.any(Array),
      })
    );
  });
});
