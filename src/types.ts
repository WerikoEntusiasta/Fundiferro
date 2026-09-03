/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TeamMember {
  name: string;
  role: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Accessory {
  name: string;
  description: string;
  category: 'Fixação' | 'Alinhamento' | 'Nivelamento & Ajuste' | 'Acesso & Segurança' | 'Suporte';
}

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
}
