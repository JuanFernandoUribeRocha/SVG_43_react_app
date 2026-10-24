import { afterEach, beforeEach, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";

beforeEach(() => {
  localStorage.clear();
  // En las pruebas no se llama a la API real, así se usa la frase de respaldo
  vi.stubGlobal("fetch", vi.fn(() => Promise.reject(new Error("sin red"))));
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
