import { JavaLexer } from "./JavaLexer";
import { JavaParser } from "./JavaParser";
function test() : void{

    let  path = process.cwd();
    let _lexer = new JavaLexer( path+"/java/test.java" ); // Create the lexer
    let parser = new JavaParser(_lexer.getILexStream());
    //_lexer.printTokens = true;
    _lexer.lexer(parser.getIPrsStream());
  
    let  ast = parser.parser();
    if(ast){
        console.log("成功");
    }
    else{
        console.log("失败");
    }
}
function test2() : void{

    let  path = process.cwd();
    let _lexer = new JavaLexer( path+"/java/test2.java" ); // Create the lexer
    let parser = new JavaParser(_lexer.getILexStream());
    //_lexer.printTokens = true;
    _lexer.lexer(parser.getIPrsStream());
  
    let  ast = parser.parser();
    if(ast){
        console.log("成功");
    }
    else{
        console.log("失败");
    }
}
test();
test2();