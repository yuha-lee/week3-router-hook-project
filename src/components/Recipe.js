import React, {useState, useEffect} from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";

/*
    class Recipe
    {
        private String[] recipe;
        public void setRecipe(String[] recipe)
        {
            this.recipe = recipe;
        }
    }
 */
export default function Recipe() {
    const [recipe, setRecipe] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    // 비동기화로 하기 위해서 async, await를 붙여줌
    useEffect(() => {
        // 서버 연결 => 데이터 가져 옴 => setRecipe로 저장
        axios.get('http://localhost:3355/recipe', {
            params: {
                page: page
            }
        }).then((result) => {
            setRecipe(result.data);
        });
    }, []);

    useEffect(() => {
        // 서버 연결 => 데이터 가져 옴 => setRecipe로 저장
        axios.get('http://localhost:3355/recipe_total').then((result) => {
            setTotal(result.data.total);
        });
    }, []);

    const onPrev = () => {
        setPage(page > 1 ? page - 1 : 1);
        axios.get('http://localhost:3355/recipe', {
            params: {
                page: page
            }
        }).then((result) => {
            setRecipe(result.data);
        });
    };

    const onNext = () => {
        setPage(page < total ? page + 1 : page);
        axios.get('http://localhost:3355/recipe', {
            params: {
                page: page
            }
        }).then((result) => {
            setRecipe(result.data);
        });
    };

    // 출력할 데이터를 모아서 return에 전송
    const html = recipe.map((r) =>
        <div className="col-md-4">
            <div className="thumbnail">
                <NavLink to={"/recipe_detail/" + r.no}>
                    <img src={r.poster} style={{"width" : "100%"}} />
                </NavLink>
                <div className="caption">
                    <p style={{"fontSize" : "8pt"}}>{r.title.length > 30 ? r.title.substring(0, 30) + "..." : r.title}</p>
                    <sub style={{"color" : "gray"}}>{r.chef}</sub>
                </div>
            </div>
        </div>
    );
    return (
        <React.Fragment>
            <div className={"row"}>
                {html}
            </div>
            <div className={"row"}>
                <button className={"btn btn-lg btn-primary"} onClick={onPrev}>이전</button>
                {page} page / {total} pages
                <button className={"btn btn-lg btn-danger"} onClick={onNext}>다음</button>
            </div>
        </React.Fragment>
    )
}