import {useEffect, useState} from "react";
import {IUrl} from "../@types";
import {PostUrl, Url} from "../api/url/url.api";

interface UrlDataHook {
  urls: IUrl[] | undefined,
  createUrl: (path: string) => void;
  updateUrls: () => void;
  deleteUrl: (id: string) => void;
  updateUrl: (id: string, path: string) => void;
}

export function useUrlData(): UrlDataHook {
  const [urls, setUrls] = useState<IUrl[]>();

  useEffect(() => {
    updateUrls()
  }, []);

  function createUrl(path: string) {
    const payload: PostUrl = {
      path: path
    };
    Url.create(payload)
      .then((data: IUrl) => {
        window.location.reload();
      })
      .catch(e => console.error(e));
  }

  function updateUrl(id: string, path: string) {
    const payload: PostUrl = {
      path: path
    };
    Url.update(id, payload)
      .then((data: IUrl) => {
        window.location.reload();
      })
      .catch(e => console.error(e));
  }

  function deleteUrl(id: string) {
    Url.delete(id)
      .then((data: IUrl) => {
        window.location.reload();
      })
      .catch(e => console.error(e));
  }

  function updateUrls() {
    Url.findAll()
      .then((data: IUrl[]) => {
        setUrls(data as IUrl[]);
      })
      .catch(err => console.error(err));
  }

  return {
    urls,
    createUrl,
    updateUrls,
    deleteUrl,
    updateUrl
  };
}
