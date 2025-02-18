import axios from 'axios';
import { Agent, ChatRoomConfig, AgentCreationOptions, Message } from '../../backend/src/types';

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_BASE_URL = 'https://faceai.uno';
const api = axios.create({
  baseURL: API_BASE_URL,
});

export const apiService = {

  // Chat
  async sendChatMessage(
    content: string, 
    previousMessages: any[],
    siteStructure: any[],
    agentType: string
  ) {
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: content,
        previousMessages,
        agentType,
        siteStructure
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send chat message');
    }

    return response.json();
  },

    async sendGameDevChatMessage(
      content: string, 
      previousMessages: Message[],
      gameStructure: string,
    ) {
      const response = await fetch(`${API_BASE_URL}/api/gamedevchat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: content,
          previousMessages,
          gameStructure : gameStructure,
        }),
      });

      console.log(response);


      if (!response.ok) {
        throw new Error('Failed to send game development chat message');
      }

      return response.json();
    },

  // Sites
  async getRecentSites(siteId:string) {
    const response = await fetch(`${API_BASE_URL}/api/recentsites`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ siteId }),
    });
    if (!response.ok) throw new Error('Failed to fetch recent sites');
    return response.json();
  },

  async getSites(startAfter?: string, address?: string) {
    const url = startAfter 
      ? `${API_BASE_URL}/api/sites?startAfter=${encodeURIComponent(startAfter)}`
      : `${API_BASE_URL}/api/sites`;
    const response = await fetch(url,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        pages: 1,
        createdBy: address, 
      }),
    });
    if (!response.ok) throw new Error('Failed to fetch sites');
    return response.json();
  },

  async getSite(siteId: string) {
    const response = await fetch(`${API_BASE_URL}/api/sites/${siteId}`);
    if (!response.ok) throw new Error('Failed to fetch site');
    return response.json();
  },

  // Host Site
  async hostSite(metadata?: any) {
    const response = await fetch(`${API_BASE_URL}/api/host`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( metadata ),
    });

    if (!response.ok) {
      throw new Error('Failed to host site');
    }

    return response.json();
  }
}; 
