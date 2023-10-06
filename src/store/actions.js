import { getUserTokens } from '@/hooks/nftContract';
import { syntheticImgAddress, getCodeId } from '@/utils/utils';
import { idsMap } from '@/plugins/nftidsMap';

export default {
  async getUserOpened({ commit }) {
    const ids = await getUserTokens();
    const userCodeId = [];
    const list = ids.ids.map((i, ind) => {
      const codeId = getCodeId(i);
      const code = idsMap[codeId] || null;
      userCodeId.push(codeId);
      return {
        id: i,
        codeId,
        code,
        qualitie: ids.qualities[ind],
        img: syntheticImgAddress(code),
      };
    });
    commit('setUserOpened', list);
    commit('setUserOpenedCodeId', userCodeId);
  },

};
