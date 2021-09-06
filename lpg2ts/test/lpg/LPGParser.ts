
    //#line 139 "btParserTemplateF.gi


    //#line 8 "LPGParser.g

  
import {BadParseException, RuleAction, PrsStream, ParseTable, BacktrackingParser, IToken, ErrorToken, ILexStream, NullExportedSymbolsException, 
UnimplementedTerminalsException, Lpg, UndefinedEofSymbolException, NotBacktrackParseTableException, BadParseSymFileException, 
IPrsStream, Monitor, DiagnoseParser, IAst, IAstVisitor, IAbstractArrayList, NotDeterministicParseTableException,
 DeterministicParser, NullTerminalSymbolsException } from "..\/..\/src";
import { LPGParserprs } from "./LPGParserprs";
import { LPGParsersym } from "./LPGParsersym";

 
    //#line 150 "btParserTemplateF.gi

export class LPGParser extends Object implements RuleAction
{
    private  prsStream  : PrsStream = new PrsStream();
    
    private  unimplementedSymbolsWarning : boolean = false;

    private static  prsTable : ParseTable = new LPGParserprs();
    public  getParseTable() : ParseTable { return LPGParser.prsTable; }

    private  btParser : BacktrackingParser ;
    public  getParser() : BacktrackingParser{ return this.btParser; }

    private  setResult(object1 : any) : void{ this.btParser.setSym1(object1); }
    public  getRhsSym(i : number) : any{ return this.btParser.getSym(i); }

    public  getRhsTokenIndex(i : number) : number{ return this.btParser.getToken(i); }
    public  getRhsIToken(i : number) : IToken { return this.prsStream.getIToken(this.getRhsTokenIndex(i)); }
    
    public  getRhsFirstTokenIndex(i : number) : number { return this.btParser.getFirstToken(i); }
    public  getRhsFirstIToken(i : number) : IToken{ return this.prsStream.getIToken(this.getRhsFirstTokenIndex(i)); }

    public  getRhsLastTokenIndex(i : number):number { return this.btParser.getLastToken(i); }
    public  getRhsLastIToken(i : number):IToken { return this.prsStream.getIToken(this.getRhsLastTokenIndex(i)); }

    public getLeftSpan() :number { return this.btParser.getFirstToken(); }
    public  getLeftIToken() :IToken { return this.prsStream.getIToken(this.getLeftSpan()); }

    public getRightSpan() : number { return this.btParser.getLastToken(); }
    public  getRightIToken() : IToken { return this.prsStream.getIToken(this.getRightSpan()); }

    public  getRhsErrorTokenIndex(i : number) : number
    {
        let index = this.btParser.getToken(i);
        let err = this.prsStream.getIToken(index);
        return (err instanceof ErrorToken ? index : 0);
    }
    public  getRhsErrorIToken(i : number) : ErrorToken
    {
        let index = this.btParser.getToken(i);
        let err = this.prsStream.getIToken(index);
        return <ErrorToken> (err instanceof ErrorToken ? err : null);
    }

    public  reset(lexStream : ILexStream) : void
    {
        this.prsStream.resetLexStream(lexStream);
        this.btParser.reset(this.prsStream);

        try
        {
            this.prsStream.remapTerminalSymbols(this.orderedTerminalSymbols(), LPGParser.prsTable.getEoftSymbol());
        } 
        catch (e)
        {     
            if( e instanceof NullExportedSymbolsException){
                
            }
            else if( e instanceof UnimplementedTerminalsException){
                if (this.unimplementedSymbolsWarning) {
                    let unimplemented_symbols = e.getSymbols();
                    Lpg.Lang.System.Out.println("The Lexer will not scan the following token(s):");
                    for (let i : number = 0; i < unimplemented_symbols.size(); i++)
                    {
                        let id = <number>unimplemented_symbols.get(i);
                        Lpg.Lang.System.Out.println("    " + LPGParsersym.orderedTerminalSymbols[id]);               
                    }
                    Lpg.Lang.System.Out.println();
                }
            }
            else if( e instanceof UndefinedEofSymbolException){
                throw  (new UndefinedEofSymbolException
                    ("The Lexer does not implement the Eof symbol " +
                    LPGParsersym.orderedTerminalSymbols[LPGParser.prsTable.getEoftSymbol()]));
            }

        }
    }
    
    constructor(lexStream? :ILexStream)
    {
        super();
        try
        {
            this.btParser = new BacktrackingParser(null, LPGParser.prsTable, <RuleAction> this);
        }
        catch (e)
        {
            if(e instanceof NotBacktrackParseTableException)
            throw (new NotBacktrackParseTableException
                                ("Regenerate LPGParserprs.ts with -BACKTRACK option"));
            else if(e instanceof BadParseSymFileException){
                throw (new BadParseSymFileException("Bad Parser Symbol File -- LPGParsersym.ts"));
            }
            else{
                throw e;
            }
        }
        if(lexStream){
          this.reset(lexStream);
        }
    }
    
   
    
    public  numTokenKinds() :number { return LPGParsersym.numTokenKinds; }
    public  orderedTerminalSymbols()  : string[] { return LPGParsersym.orderedTerminalSymbols; }
    public  getTokenKindName(kind : number ) : string { return LPGParsersym.orderedTerminalSymbols[kind]; }
    public  getEOFTokenKind() : number{ return LPGParser.prsTable.getEoftSymbol(); }
    public  getIPrsStream()  : IPrsStream{ return this.prsStream; }

    /**
     * @deprecated replaced by {@link #getIPrsStream()}
     *
     */
    public  getPrsStream()  : PrsStream{ return this.prsStream; }

    /**
     * @deprecated replaced by {@link #getIPrsStream()}
     *
     */
    public  getParseStream() : PrsStream { return this.prsStream; }

 

    public parser(error_repair_count : number = 0 ,  monitor? : Monitor) :  any | null
    {
        this.btParser.setMonitor(monitor);
        
        try
        {
            return <any> this.btParser.fuzzyParse(error_repair_count);
        }
        catch (ex)
        {
           if( ex instanceof BadParseException ){
                 let e = <BadParseException>(ex);
                this.prsStream.reset(e.error_token); // point to error token

                let diagnoseParser = new DiagnoseParser(this.prsStream, LPGParser.prsTable);
                diagnoseParser.diagnose(e.error_token);
            }
            else{
                throw ex;
            }
        }

        return null;
    }

    //
    // Additional entry points, if any
    //
    

    //#line 234 "LPGParser.g



    //#line 309 "btParserTemplateF.gi

    
    public  ruleAction(ruleNumber : number) : void
    {
        switch (ruleNumber)
        {

            //
            // Rule 1:  LPG ::= options_segment LPG_INPUT
            //
            case 1: {
               //#line 47 "LPGParser.g"
                this.setResult(
                    //#line 47 LPGParser.g
                    new LPG(this.getLeftIToken(), this.getRightIToken(),
                            //#line 47 LPGParser.g
                            <option_specList>this.getRhsSym(1),
                            //#line 47 LPGParser.g
                            <LPG_itemList>this.getRhsSym(2))
                //#line 47 LPGParser.g
                );
            break;
            }
            //
            // Rule 2:  LPG_INPUT ::= %Empty
            //
            case 2: {
               //#line 50 "LPGParser.g"
                this.setResult(
                    //#line 50 LPGParser.g
                    new LPG_itemList(this.getLeftIToken(), this.getRightIToken(), true /* left recursive */)
                //#line 50 LPGParser.g
                );
            break;
            }
            //
            // Rule 3:  LPG_INPUT ::= LPG_INPUT LPG_item
            //
            case 3: {
               //#line 51 "LPGParser.g"
                (<LPG_itemList>this.getRhsSym(1)).addElement(<ILPG_item>this.getRhsSym(2));
            break;
            }
            //
            // Rule 4:  LPG_item ::= ALIAS_KEY$ alias_segment END_KEY_OPT$
            //
            case 4: {
               //#line 54 "LPGParser.g"
                this.setResult(
                    //#line 54 LPGParser.g
                    new AliasSeg(this.getLeftIToken(), this.getRightIToken(),
                                 //#line 54 LPGParser.g
                                 <aliasSpecList>this.getRhsSym(2))
                //#line 54 LPGParser.g
                );
            break;
            }
            //
            // Rule 5:  LPG_item ::= AST_KEY$ ast_segment END_KEY_OPT$
            //
            case 5: {
               //#line 55 "LPGParser.g"
                this.setResult(
                    //#line 55 LPGParser.g
                    new AstSeg(this.getLeftIToken(), this.getRightIToken(),
                               //#line 55 LPGParser.g
                               <action_segmentList>this.getRhsSym(2))
                //#line 55 LPGParser.g
                );
            break;
            }
            //
            // Rule 6:  LPG_item ::= DEFINE_KEY$ define_segment END_KEY_OPT$
            //
            case 6: {
               //#line 56 "LPGParser.g"
                this.setResult(
                    //#line 56 LPGParser.g
                    new DefineSeg(this.getLeftIToken(), this.getRightIToken(),
                                  //#line 56 LPGParser.g
                                  <defineSpecList>this.getRhsSym(2))
                //#line 56 LPGParser.g
                );
            break;
            }
            //
            // Rule 7:  LPG_item ::= EOF_KEY$ eof_segment END_KEY_OPT$
            //
            case 7: {
               //#line 57 "LPGParser.g"
                this.setResult(
                    //#line 57 LPGParser.g
                    new EofSeg(this.getLeftIToken(), this.getRightIToken(),
                               //#line 57 LPGParser.g
                               <Ieof_segment>this.getRhsSym(2))
                //#line 57 LPGParser.g
                );
            break;
            }
            //
            // Rule 8:  LPG_item ::= EOL_KEY$ eol_segment END_KEY_OPT$
            //
            case 8: {
               //#line 58 "LPGParser.g"
                this.setResult(
                    //#line 58 LPGParser.g
                    new EolSeg(this.getLeftIToken(), this.getRightIToken(),
                               //#line 58 LPGParser.g
                               <Ieol_segment>this.getRhsSym(2))
                //#line 58 LPGParser.g
                );
            break;
            }
            //
            // Rule 9:  LPG_item ::= ERROR_KEY$ error_segment END_KEY_OPT$
            //
            case 9: {
               //#line 59 "LPGParser.g"
                this.setResult(
                    //#line 59 LPGParser.g
                    new ErrorSeg(this.getLeftIToken(), this.getRightIToken(),
                                 //#line 59 LPGParser.g
                                 <Ierror_segment>this.getRhsSym(2))
                //#line 59 LPGParser.g
                );
            break;
            }
            //
            // Rule 10:  LPG_item ::= EXPORT_KEY$ export_segment END_KEY_OPT$
            //
            case 10: {
               //#line 60 "LPGParser.g"
                this.setResult(
                    //#line 60 LPGParser.g
                    new ExportSeg(this.getLeftIToken(), this.getRightIToken(),
                                  //#line 60 LPGParser.g
                                  <terminal_symbolList>this.getRhsSym(2))
                //#line 60 LPGParser.g
                );
            break;
            }
            //
            // Rule 11:  LPG_item ::= GLOBALS_KEY$ globals_segment END_KEY_OPT$
            //
            case 11: {
               //#line 61 "LPGParser.g"
                this.setResult(
                    //#line 61 LPGParser.g
                    new GlobalsSeg(this.getLeftIToken(), this.getRightIToken(),
                                   //#line 61 LPGParser.g
                                   <action_segmentList>this.getRhsSym(2))
                //#line 61 LPGParser.g
                );
            break;
            }
            //
            // Rule 12:  LPG_item ::= HEADERS_KEY$ headers_segment END_KEY_OPT$
            //
            case 12: {
               //#line 62 "LPGParser.g"
                this.setResult(
                    //#line 62 LPGParser.g
                    new HeadersSeg(this.getLeftIToken(), this.getRightIToken(),
                                   //#line 62 LPGParser.g
                                   <action_segmentList>this.getRhsSym(2))
                //#line 62 LPGParser.g
                );
            break;
            }
            //
            // Rule 13:  LPG_item ::= IDENTIFIER_KEY$ identifier_segment END_KEY_OPT$
            //
            case 13: {
               //#line 63 "LPGParser.g"
                this.setResult(
                    //#line 63 LPGParser.g
                    new IdentifierSeg(this.getLeftIToken(), this.getRightIToken(),
                                      //#line 63 LPGParser.g
                                      <Iidentifier_segment>this.getRhsSym(2))
                //#line 63 LPGParser.g
                );
            break;
            }
            //
            // Rule 14:  LPG_item ::= IMPORT_KEY$ import_segment END_KEY_OPT$
            //
            case 14: {
               //#line 64 "LPGParser.g"
                this.setResult(
                    //#line 64 LPGParser.g
                    new ImportSeg(this.getLeftIToken(), this.getRightIToken(),
                                  //#line 64 LPGParser.g
                                  <import_segment>this.getRhsSym(2))
                //#line 64 LPGParser.g
                );
            break;
            }
            //
            // Rule 15:  LPG_item ::= INCLUDE_KEY$ include_segment END_KEY_OPT$
            //
            case 15: {
               //#line 65 "LPGParser.g"
                this.setResult(
                    //#line 65 LPGParser.g
                    new IncludeSeg(this.getLeftIToken(), this.getRightIToken(),
                                   //#line 65 LPGParser.g
                                   <include_segment>this.getRhsSym(2))
                //#line 65 LPGParser.g
                );
            break;
            }
            //
            // Rule 16:  LPG_item ::= KEYWORDS_KEY$ keywords_segment END_KEY_OPT$
            //
            case 16: {
               //#line 66 "LPGParser.g"
                this.setResult(
                    //#line 66 LPGParser.g
                    new KeywordsSeg(this.getLeftIToken(), this.getRightIToken(),
                                    //#line 66 LPGParser.g
                                    <keywordSpecList>this.getRhsSym(2))
                //#line 66 LPGParser.g
                );
            break;
            }
            //
            // Rule 17:  LPG_item ::= NAMES_KEY$ names_segment END_KEY_OPT$
            //
            case 17: {
               //#line 67 "LPGParser.g"
                this.setResult(
                    //#line 67 LPGParser.g
                    new NamesSeg(this.getLeftIToken(), this.getRightIToken(),
                                 //#line 67 LPGParser.g
                                 <nameSpecList>this.getRhsSym(2))
                //#line 67 LPGParser.g
                );
            break;
            }
            //
            // Rule 18:  LPG_item ::= NOTICE_KEY$ notice_segment END_KEY_OPT$
            //
            case 18: {
               //#line 68 "LPGParser.g"
                this.setResult(
                    //#line 68 LPGParser.g
                    new NoticeSeg(this.getLeftIToken(), this.getRightIToken(),
                                  //#line 68 LPGParser.g
                                  <action_segmentList>this.getRhsSym(2))
                //#line 68 LPGParser.g
                );
            break;
            }
            //
            // Rule 19:  LPG_item ::= RULES_KEY$ rules_segment END_KEY_OPT$
            //
            case 19: {
               //#line 69 "LPGParser.g"
                this.setResult(
                    //#line 69 LPGParser.g
                    new RulesSeg(this.getLeftIToken(), this.getRightIToken(),
                                 //#line 69 LPGParser.g
                                 <rules_segment>this.getRhsSym(2))
                //#line 69 LPGParser.g
                );
            break;
            }
            //
            // Rule 20:  LPG_item ::= SOFT_KEYWORDS_KEY$ keywords_segment END_KEY_OPT$
            //
            case 20: {
               //#line 70 "LPGParser.g"
                this.setResult(
                    //#line 70 LPGParser.g
                    new SoftKeywordsSeg(this.getLeftIToken(), this.getRightIToken(),
                                        //#line 70 LPGParser.g
                                        <keywordSpecList>this.getRhsSym(2))
                //#line 70 LPGParser.g
                );
            break;
            }
            //
            // Rule 21:  LPG_item ::= START_KEY$ start_segment END_KEY_OPT$
            //
            case 21: {
               //#line 71 "LPGParser.g"
                this.setResult(
                    //#line 71 LPGParser.g
                    new StartSeg(this.getLeftIToken(), this.getRightIToken(),
                                 //#line 71 LPGParser.g
                                 <start_symbolList>this.getRhsSym(2))
                //#line 71 LPGParser.g
                );
            break;
            }
            //
            // Rule 22:  LPG_item ::= TERMINALS_KEY$ terminals_segment END_KEY_OPT$
            //
            case 22: {
               //#line 72 "LPGParser.g"
                this.setResult(
                    //#line 72 LPGParser.g
                    new TerminalsSeg(this.getLeftIToken(), this.getRightIToken(),
                                     //#line 72 LPGParser.g
                                     <terminals_segment_terminalList>this.getRhsSym(2))
                //#line 72 LPGParser.g
                );
            break;
            }
            //
            // Rule 23:  LPG_item ::= TRAILERS_KEY$ trailers_segment END_KEY_OPT$
            //
            case 23: {
               //#line 73 "LPGParser.g"
                this.setResult(
                    //#line 73 LPGParser.g
                    new TrailersSeg(this.getLeftIToken(), this.getRightIToken(),
                                    //#line 73 LPGParser.g
                                    <action_segmentList>this.getRhsSym(2))
                //#line 73 LPGParser.g
                );
            break;
            }
            //
            // Rule 24:  LPG_item ::= TYPES_KEY$ types_segment END_KEY_OPT$
            //
            case 24: {
               //#line 74 "LPGParser.g"
                this.setResult(
                    //#line 74 LPGParser.g
                    new TypesSeg(this.getLeftIToken(), this.getRightIToken(),
                                 //#line 74 LPGParser.g
                                 <type_declarationsList>this.getRhsSym(2))
                //#line 74 LPGParser.g
                );
            break;
            }
            //
            // Rule 25:  LPG_item ::= RECOVER_KEY$ recover_segment END_KEY_OPT$
            //
            case 25: {
               //#line 75 "LPGParser.g"
                this.setResult(
                    //#line 75 LPGParser.g
                    new RecoverSeg(this.getLeftIToken(), this.getRightIToken(),
                                   //#line 75 LPGParser.g
                                   <SYMBOLList>this.getRhsSym(2))
                //#line 75 LPGParser.g
                );
            break;
            }
            //
            // Rule 26:  LPG_item ::= DISJOINTPREDECESSORSETS_KEY$ predecessor_segment END_KEY_OPT$
            //
            case 26: {
               //#line 76 "LPGParser.g"
                this.setResult(
                    //#line 76 LPGParser.g
                    new PredecessorSeg(this.getLeftIToken(), this.getRightIToken(),
                                       //#line 76 LPGParser.g
                                       <symbol_pairList>this.getRhsSym(2))
                //#line 76 LPGParser.g
                );
            break;
            }
            //
            // Rule 27:  options_segment ::= %Empty
            //
            case 27: {
               //#line 79 "LPGParser.g"
                this.setResult(
                    //#line 79 LPGParser.g
                    new option_specList(this.getLeftIToken(), this.getRightIToken(), true /* left recursive */)
                //#line 79 LPGParser.g
                );
            break;
            }
            //
            // Rule 28:  options_segment ::= options_segment option_spec
            //
            case 28: {
               //#line 79 "LPGParser.g"
                (<option_specList>this.getRhsSym(1)).addElement(<option_spec>this.getRhsSym(2));
            break;
            }
            //
            // Rule 29:  option_spec ::= OPTIONS_KEY$ option_list
            //
            case 29: {
               //#line 80 "LPGParser.g"
                this.setResult(
                    //#line 80 LPGParser.g
                    new option_spec(this.getLeftIToken(), this.getRightIToken(),
                                    //#line 80 LPGParser.g
                                    <optionList>this.getRhsSym(2))
                //#line 80 LPGParser.g
                );
            break;
            }
            //
            // Rule 30:  option_list ::= option
            //
            case 30: {
               //#line 81 "LPGParser.g"
                this.setResult(
                    //#line 81 LPGParser.g
                    optionList.optionListfromElement(<option>this.getRhsSym(1), true /* left recursive */)
                //#line 81 LPGParser.g
                );
            break;
            }
            //
            // Rule 31:  option_list ::= option_list ,$ option
            //
            case 31: {
               //#line 81 "LPGParser.g"
                (<optionList>this.getRhsSym(1)).addElement(<option>this.getRhsSym(3));
            break;
            }
            //
            // Rule 32:  option ::= SYMBOL option_value
            //
            case 32: {
               //#line 82 "LPGParser.g"
                this.setResult(
                    //#line 82 LPGParser.g
                    new option(this.getLeftIToken(), this.getRightIToken(),
                               //#line 82 LPGParser.g
                               new ASTNodeToken(this.getRhsIToken(1)),
                               //#line 82 LPGParser.g
                               <Ioption_value>this.getRhsSym(2))
                //#line 82 LPGParser.g
                );
            break;
            }
            //
            // Rule 33:  option_value ::= %Empty
            //
            case 33: {
               //#line 83 "LPGParser.g"
                this.setResult(null);
            break;
            }
            //
            // Rule 34:  option_value ::= =$ SYMBOL
            //
            case 34: {
               //#line 83 "LPGParser.g"
                this.setResult(
                    //#line 83 LPGParser.g
                    new option_value0(this.getLeftIToken(), this.getRightIToken(),
                                      //#line 83 LPGParser.g
                                      new ASTNodeToken(this.getRhsIToken(2)))
                //#line 83 LPGParser.g
                );
            break;
            }
            //
            // Rule 35:  option_value ::= =$ ($ symbol_list )$
            //
            case 35: {
               //#line 83 "LPGParser.g"
                this.setResult(
                    //#line 83 LPGParser.g
                    new option_value1(this.getLeftIToken(), this.getRightIToken(),
                                      //#line 83 LPGParser.g
                                      <SYMBOLList>this.getRhsSym(3))
                //#line 83 LPGParser.g
                );
            break;
            }
            //
            // Rule 36:  symbol_list ::= SYMBOL
            //
            case 36: {
               //#line 85 "LPGParser.g"
                this.setResult(
                    //#line 85 LPGParser.g
                    SYMBOLList.SYMBOLListfromElement(new ASTNodeToken(this.getRhsIToken(1)), true /* left recursive */)
                //#line 85 LPGParser.g
                );
            break;
            }
            //
            // Rule 37:  symbol_list ::= symbol_list ,$ SYMBOL
            //
            case 37: {
               //#line 86 "LPGParser.g"
                (<SYMBOLList>this.getRhsSym(1)).addElement(new ASTNodeToken(this.getRhsIToken(3)));
            break;
            }
            //
            // Rule 38:  alias_segment ::= aliasSpec
            //
            case 38: {
               //#line 89 "LPGParser.g"
                this.setResult(
                    //#line 89 LPGParser.g
                    aliasSpecList.aliasSpecListfromElement(<IaliasSpec>this.getRhsSym(1), true /* left recursive */)
                //#line 89 LPGParser.g
                );
            break;
            }
            //
            // Rule 39:  alias_segment ::= alias_segment aliasSpec
            //
            case 39: {
               //#line 89 "LPGParser.g"
                (<aliasSpecList>this.getRhsSym(1)).addElement(<IaliasSpec>this.getRhsSym(2));
            break;
            }
            //
            // Rule 40:  aliasSpec ::= ERROR_KEY produces alias_rhs
            //
            case 40: {
               //#line 91 "LPGParser.g"
                this.setResult(
                    //#line 91 LPGParser.g
                    new aliasSpec0(this.getLeftIToken(), this.getRightIToken(),
                                   //#line 91 LPGParser.g
                                   new ASTNodeToken(this.getRhsIToken(1)),
                                   //#line 91 LPGParser.g
                                   <Iproduces>this.getRhsSym(2),
                                   //#line 91 LPGParser.g
                                   <Ialias_rhs>this.getRhsSym(3))
                //#line 91 LPGParser.g
                );
            break;
            }
            //
            // Rule 41:  aliasSpec ::= EOL_KEY produces alias_rhs
            //
            case 41: {
               //#line 92 "LPGParser.g"
                this.setResult(
                    //#line 92 LPGParser.g
                    new aliasSpec1(this.getLeftIToken(), this.getRightIToken(),
                                   //#line 92 LPGParser.g
                                   new ASTNodeToken(this.getRhsIToken(1)),
                                   //#line 92 LPGParser.g
                                   <Iproduces>this.getRhsSym(2),
                                   //#line 92 LPGParser.g
                                   <Ialias_rhs>this.getRhsSym(3))
                //#line 92 LPGParser.g
                );
            break;
            }
            //
            // Rule 42:  aliasSpec ::= EOF_KEY produces alias_rhs
            //
            case 42: {
               //#line 93 "LPGParser.g"
                this.setResult(
                    //#line 93 LPGParser.g
                    new aliasSpec2(this.getLeftIToken(), this.getRightIToken(),
                                   //#line 93 LPGParser.g
                                   new ASTNodeToken(this.getRhsIToken(1)),
                                   //#line 93 LPGParser.g
                                   <Iproduces>this.getRhsSym(2),
                                   //#line 93 LPGParser.g
                                   <Ialias_rhs>this.getRhsSym(3))
                //#line 93 LPGParser.g
                );
            break;
            }
            //
            // Rule 43:  aliasSpec ::= IDENTIFIER_KEY produces alias_rhs
            //
            case 43: {
               //#line 94 "LPGParser.g"
                this.setResult(
                    //#line 94 LPGParser.g
                    new aliasSpec3(this.getLeftIToken(), this.getRightIToken(),
                                   //#line 94 LPGParser.g
                                   new ASTNodeToken(this.getRhsIToken(1)),
                                   //#line 94 LPGParser.g
                                   <Iproduces>this.getRhsSym(2),
                                   //#line 94 LPGParser.g
                                   <Ialias_rhs>this.getRhsSym(3))
                //#line 94 LPGParser.g
                );
            break;
            }
            //
            // Rule 44:  aliasSpec ::= SYMBOL produces alias_rhs
            //
            case 44: {
               //#line 95 "LPGParser.g"
                this.setResult(
                    //#line 95 LPGParser.g
                    new aliasSpec4(this.getLeftIToken(), this.getRightIToken(),
                                   //#line 95 LPGParser.g
                                   new ASTNodeToken(this.getRhsIToken(1)),
                                   //#line 95 LPGParser.g
                                   <Iproduces>this.getRhsSym(2),
                                   //#line 95 LPGParser.g
                                   <Ialias_rhs>this.getRhsSym(3))
                //#line 95 LPGParser.g
                );
            break;
            }
            //
            // Rule 45:  aliasSpec ::= alias_lhs_macro_name produces alias_rhs
            //
            case 45: {
               //#line 96 "LPGParser.g"
                this.setResult(
                    //#line 96 LPGParser.g
                    new aliasSpec5(this.getLeftIToken(), this.getRightIToken(),
                                   //#line 96 LPGParser.g
                                   <alias_lhs_macro_name>this.getRhsSym(1),
                                   //#line 96 LPGParser.g
                                   <Iproduces>this.getRhsSym(2),
                                   //#line 96 LPGParser.g
                                   <Ialias_rhs>this.getRhsSym(3))
                //#line 96 LPGParser.g
                );
            break;
            }
            //
            // Rule 46:  alias_lhs_macro_name ::= MACRO_NAME
            //
            case 46: {
               //#line 98 "LPGParser.g"
                this.setResult(
                    //#line 98 LPGParser.g
                    new alias_lhs_macro_name(this.getRhsIToken(1))
                //#line 98 LPGParser.g
                );
            break;
            }
            //
            // Rule 47:  alias_rhs ::= SYMBOL
            //
            case 47: {
               //#line 100 "LPGParser.g"
                this.setResult(
                    //#line 100 LPGParser.g
                    new alias_rhs0(this.getRhsIToken(1))
                //#line 100 LPGParser.g
                );
            break;
            }
            //
            // Rule 48:  alias_rhs ::= MACRO_NAME
            //
            case 48: {
               //#line 101 "LPGParser.g"
                this.setResult(
                    //#line 101 LPGParser.g
                    new alias_rhs1(this.getRhsIToken(1))
                //#line 101 LPGParser.g
                );
            break;
            }
            //
            // Rule 49:  alias_rhs ::= ERROR_KEY
            //
            case 49: {
               //#line 102 "LPGParser.g"
                this.setResult(
                    //#line 102 LPGParser.g
                    new alias_rhs2(this.getRhsIToken(1))
                //#line 102 LPGParser.g
                );
            break;
            }
            //
            // Rule 50:  alias_rhs ::= EOL_KEY
            //
            case 50: {
               //#line 103 "LPGParser.g"
                this.setResult(
                    //#line 103 LPGParser.g
                    new alias_rhs3(this.getRhsIToken(1))
                //#line 103 LPGParser.g
                );
            break;
            }
            //
            // Rule 51:  alias_rhs ::= EOF_KEY
            //
            case 51: {
               //#line 104 "LPGParser.g"
                this.setResult(
                    //#line 104 LPGParser.g
                    new alias_rhs4(this.getRhsIToken(1))
                //#line 104 LPGParser.g
                );
            break;
            }
            //
            // Rule 52:  alias_rhs ::= EMPTY_KEY
            //
            case 52: {
               //#line 105 "LPGParser.g"
                this.setResult(
                    //#line 105 LPGParser.g
                    new alias_rhs5(this.getRhsIToken(1))
                //#line 105 LPGParser.g
                );
            break;
            }
            //
            // Rule 53:  alias_rhs ::= IDENTIFIER_KEY
            //
            case 53: {
               //#line 106 "LPGParser.g"
                this.setResult(
                    //#line 106 LPGParser.g
                    new alias_rhs6(this.getRhsIToken(1))
                //#line 106 LPGParser.g
                );
            break;
            }
            //
            // Rule 54:  ast_segment ::= action_segment_list
            //
            case 54:
                break;
            //
            // Rule 55:  define_segment ::= defineSpec
            //
            case 55: {
               //#line 112 "LPGParser.g"
                this.setResult(
                    //#line 112 LPGParser.g
                    defineSpecList.defineSpecListfromElement(<defineSpec>this.getRhsSym(1), true /* left recursive */)
                //#line 112 LPGParser.g
                );
            break;
            }
            //
            // Rule 56:  define_segment ::= define_segment defineSpec
            //
            case 56: {
               //#line 112 "LPGParser.g"
                (<defineSpecList>this.getRhsSym(1)).addElement(<defineSpec>this.getRhsSym(2));
            break;
            }
            //
            // Rule 57:  defineSpec ::= macro_name_symbol macro_segment
            //
            case 57: {
               //#line 113 "LPGParser.g"
                this.setResult(
                    //#line 113 LPGParser.g
                    new defineSpec(this.getLeftIToken(), this.getRightIToken(),
                                   //#line 113 LPGParser.g
                                   <Imacro_name_symbol>this.getRhsSym(1),
                                   //#line 113 LPGParser.g
                                   <macro_segment>this.getRhsSym(2))
                //#line 113 LPGParser.g
                );
            break;
            }
            //
            // Rule 58:  macro_name_symbol ::= MACRO_NAME
            //
            case 58: {
               //#line 116 "LPGParser.g"
                this.setResult(
                    //#line 116 LPGParser.g
                    new macro_name_symbol0(this.getRhsIToken(1))
                //#line 116 LPGParser.g
                );
            break;
            }
            //
            // Rule 59:  macro_name_symbol ::= SYMBOL
            //
            case 59: {
               //#line 117 "LPGParser.g"
                this.setResult(
                    //#line 117 LPGParser.g
                    new macro_name_symbol1(this.getRhsIToken(1))
                //#line 117 LPGParser.g
                );
            break;
            }
            //
            // Rule 60:  macro_segment ::= BLOCK
            //
            case 60: {
               //#line 118 "LPGParser.g"
                this.setResult(
                    //#line 118 LPGParser.g
                    new macro_segment(this.getRhsIToken(1))
                //#line 118 LPGParser.g
                );
            break;
            }
            //
            // Rule 61:  eol_segment ::= terminal_symbol
            //
            case 61:
                break;
            //
            // Rule 62:  eof_segment ::= terminal_symbol
            //
            case 62:
                break;
            //
            // Rule 63:  error_segment ::= terminal_symbol
            //
            case 63:
                break;
            //
            // Rule 64:  export_segment ::= terminal_symbol
            //
            case 64: {
               //#line 128 "LPGParser.g"
                this.setResult(
                    //#line 128 LPGParser.g
                    terminal_symbolList.terminal_symbolListfromElement(<Iterminal_symbol>this.getRhsSym(1), true /* left recursive */)
                //#line 128 LPGParser.g
                );
            break;
            }
            //
            // Rule 65:  export_segment ::= export_segment terminal_symbol
            //
            case 65: {
               //#line 128 "LPGParser.g"
                (<terminal_symbolList>this.getRhsSym(1)).addElement(<Iterminal_symbol>this.getRhsSym(2));
            break;
            }
            //
            // Rule 66:  globals_segment ::= action_segment
            //
            case 66: {
               //#line 131 "LPGParser.g"
                this.setResult(
                    //#line 131 LPGParser.g
                    action_segmentList.action_segmentListfromElement(<action_segment>this.getRhsSym(1), true /* left recursive */)
                //#line 131 LPGParser.g
                );
            break;
            }
            //
            // Rule 67:  globals_segment ::= globals_segment action_segment
            //
            case 67: {
               //#line 131 "LPGParser.g"
                (<action_segmentList>this.getRhsSym(1)).addElement(<action_segment>this.getRhsSym(2));
            break;
            }
            //
            // Rule 68:  headers_segment ::= action_segment_list
            //
            case 68:
                break;
            //
            // Rule 69:  identifier_segment ::= terminal_symbol
            //
            case 69:
                break;
            //
            // Rule 70:  import_segment ::= SYMBOL drop_command_list
            //
            case 70: {
               //#line 140 "LPGParser.g"
                this.setResult(
                    //#line 140 LPGParser.g
                    new import_segment(this.getLeftIToken(), this.getRightIToken(),
                                       //#line 140 LPGParser.g
                                       new ASTNodeToken(this.getRhsIToken(1)),
                                       //#line 140 LPGParser.g
                                       <drop_commandList>this.getRhsSym(2))
                //#line 140 LPGParser.g
                );
            break;
            }
            //
            // Rule 71:  drop_command_list ::= %Empty
            //
            case 71: {
               //#line 142 "LPGParser.g"
                this.setResult(
                    //#line 142 LPGParser.g
                    new drop_commandList(this.getLeftIToken(), this.getRightIToken(), true /* left recursive */)
                //#line 142 LPGParser.g
                );
            break;
            }
            //
            // Rule 72:  drop_command_list ::= drop_command_list drop_command
            //
            case 72: {
               //#line 142 "LPGParser.g"
                (<drop_commandList>this.getRhsSym(1)).addElement(<Idrop_command>this.getRhsSym(2));
            break;
            }
            //
            // Rule 73:  drop_command ::= DROPSYMBOLS_KEY drop_symbols
            //
            case 73: {
               //#line 144 "LPGParser.g"
                this.setResult(
                    //#line 144 LPGParser.g
                    new drop_command0(this.getLeftIToken(), this.getRightIToken(),
                                      //#line 144 LPGParser.g
                                      new ASTNodeToken(this.getRhsIToken(1)),
                                      //#line 144 LPGParser.g
                                      <SYMBOLList>this.getRhsSym(2))
                //#line 144 LPGParser.g
                );
            break;
            }
            //
            // Rule 74:  drop_command ::= DROPRULES_KEY drop_rules
            //
            case 74: {
               //#line 145 "LPGParser.g"
                this.setResult(
                    //#line 145 LPGParser.g
                    new drop_command1(this.getLeftIToken(), this.getRightIToken(),
                                      //#line 145 LPGParser.g
                                      new ASTNodeToken(this.getRhsIToken(1)),
                                      //#line 145 LPGParser.g
                                      <drop_ruleList>this.getRhsSym(2))
                //#line 145 LPGParser.g
                );
            break;
            }
            //
            // Rule 75:  drop_symbols ::= SYMBOL
            //
            case 75: {
               //#line 147 "LPGParser.g"
                this.setResult(
                    //#line 147 LPGParser.g
                    SYMBOLList.SYMBOLListfromElement(new ASTNodeToken(this.getRhsIToken(1)), true /* left recursive */)
                //#line 147 LPGParser.g
                );
            break;
            }
            //
            // Rule 76:  drop_symbols ::= drop_symbols SYMBOL
            //
            case 76: {
               //#line 148 "LPGParser.g"
                (<SYMBOLList>this.getRhsSym(1)).addElement(new ASTNodeToken(this.getRhsIToken(2)));
            break;
            }
            //
            // Rule 77:  drop_rules ::= drop_rule
            //
            case 77: {
               //#line 149 "LPGParser.g"
                this.setResult(
                    //#line 149 LPGParser.g
                    drop_ruleList.drop_ruleListfromElement(<drop_rule>this.getRhsSym(1), true /* left recursive */)
                //#line 149 LPGParser.g
                );
            break;
            }
            //
            // Rule 78:  drop_rules ::= drop_rules drop_rule
            //
            case 78: {
               //#line 150 "LPGParser.g"
                (<drop_ruleList>this.getRhsSym(1)).addElement(<drop_rule>this.getRhsSym(2));
            break;
            }
            //
            // Rule 79:  drop_rule ::= SYMBOL optMacroName produces ruleList
            //
            case 79: {
               //#line 152 "LPGParser.g"
                this.setResult(
                    //#line 152 LPGParser.g
                    new drop_rule(this.getLeftIToken(), this.getRightIToken(),
                                  //#line 152 LPGParser.g
                                  new ASTNodeToken(this.getRhsIToken(1)),
                                  //#line 152 LPGParser.g
                                  <optMacroName>this.getRhsSym(2),
                                  //#line 152 LPGParser.g
                                  <Iproduces>this.getRhsSym(3),
                                  //#line 152 LPGParser.g
                                  <ruleList>this.getRhsSym(4))
                //#line 152 LPGParser.g
                );
            break;
            }
            //
            // Rule 80:  optMacroName ::= %Empty
            //
            case 80: {
               //#line 154 "LPGParser.g"
                this.setResult(null);
            break;
            }
            //
            // Rule 81:  optMacroName ::= MACRO_NAME
            //
            case 81: {
               //#line 154 "LPGParser.g"
                this.setResult(
                    //#line 154 LPGParser.g
                    new optMacroName(this.getRhsIToken(1))
                //#line 154 LPGParser.g
                );
            break;
            }
            //
            // Rule 82:  include_segment ::= SYMBOL
            //
            case 82: {
               //#line 157 "LPGParser.g"
                this.setResult(
                    //#line 157 LPGParser.g
                    new include_segment(this.getRhsIToken(1))
                //#line 157 LPGParser.g
                );
            break;
            }
            //
            // Rule 83:  keywords_segment ::= keywordSpec
            //
            case 83: {
               //#line 160 "LPGParser.g"
                this.setResult(
                    //#line 160 LPGParser.g
                    keywordSpecList.keywordSpecListfromElement(<IkeywordSpec>this.getRhsSym(1), true /* left recursive */)
                //#line 160 LPGParser.g
                );
            break;
            }
            //
            // Rule 84:  keywords_segment ::= keywords_segment keywordSpec
            //
            case 84: {
               //#line 160 "LPGParser.g"
                (<keywordSpecList>this.getRhsSym(1)).addElement(<IkeywordSpec>this.getRhsSym(2));
            break;
            }
            //
            // Rule 85:  keywordSpec ::= terminal_symbol
            //
            case 85:
                break;
            //
            // Rule 86:  keywordSpec ::= terminal_symbol produces name
            //
            case 86: {
               //#line 162 "LPGParser.g"
                this.setResult(
                    //#line 162 LPGParser.g
                    new keywordSpec(this.getLeftIToken(), this.getRightIToken(),
                                    //#line 162 LPGParser.g
                                    <Iterminal_symbol>this.getRhsSym(1),
                                    //#line 162 LPGParser.g
                                    <Iproduces>this.getRhsSym(2),
                                    //#line 162 LPGParser.g
                                    <Iname>this.getRhsSym(3))
                //#line 162 LPGParser.g
                );
            break;
            }
            //
            // Rule 87:  names_segment ::= nameSpec
            //
            case 87: {
               //#line 165 "LPGParser.g"
                this.setResult(
                    //#line 165 LPGParser.g
                    nameSpecList.nameSpecListfromElement(<nameSpec>this.getRhsSym(1), true /* left recursive */)
                //#line 165 LPGParser.g
                );
            break;
            }
            //
            // Rule 88:  names_segment ::= names_segment nameSpec
            //
            case 88: {
               //#line 165 "LPGParser.g"
                (<nameSpecList>this.getRhsSym(1)).addElement(<nameSpec>this.getRhsSym(2));
            break;
            }
            //
            // Rule 89:  nameSpec ::= name produces name
            //
            case 89: {
               //#line 166 "LPGParser.g"
                this.setResult(
                    //#line 166 LPGParser.g
                    new nameSpec(this.getLeftIToken(), this.getRightIToken(),
                                 //#line 166 LPGParser.g
                                 <Iname>this.getRhsSym(1),
                                 //#line 166 LPGParser.g
                                 <Iproduces>this.getRhsSym(2),
                                 //#line 166 LPGParser.g
                                 <Iname>this.getRhsSym(3))
                //#line 166 LPGParser.g
                );
            break;
            }
            //
            // Rule 90:  name ::= SYMBOL
            //
            case 90: {
               //#line 168 "LPGParser.g"
                this.setResult(
                    //#line 168 LPGParser.g
                    new name0(this.getRhsIToken(1))
                //#line 168 LPGParser.g
                );
            break;
            }
            //
            // Rule 91:  name ::= MACRO_NAME
            //
            case 91: {
               //#line 169 "LPGParser.g"
                this.setResult(
                    //#line 169 LPGParser.g
                    new name1(this.getRhsIToken(1))
                //#line 169 LPGParser.g
                );
            break;
            }
            //
            // Rule 92:  name ::= EMPTY_KEY
            //
            case 92: {
               //#line 170 "LPGParser.g"
                this.setResult(
                    //#line 170 LPGParser.g
                    new name2(this.getRhsIToken(1))
                //#line 170 LPGParser.g
                );
            break;
            }
            //
            // Rule 93:  name ::= ERROR_KEY
            //
            case 93: {
               //#line 171 "LPGParser.g"
                this.setResult(
                    //#line 171 LPGParser.g
                    new name3(this.getRhsIToken(1))
                //#line 171 LPGParser.g
                );
            break;
            }
            //
            // Rule 94:  name ::= EOL_KEY
            //
            case 94: {
               //#line 172 "LPGParser.g"
                this.setResult(
                    //#line 172 LPGParser.g
                    new name4(this.getRhsIToken(1))
                //#line 172 LPGParser.g
                );
            break;
            }
            //
            // Rule 95:  name ::= IDENTIFIER_KEY
            //
            case 95: {
               //#line 173 "LPGParser.g"
                this.setResult(
                    //#line 173 LPGParser.g
                    new name5(this.getRhsIToken(1))
                //#line 173 LPGParser.g
                );
            break;
            }
            //
            // Rule 96:  notice_segment ::= action_segment
            //
            case 96: {
               //#line 176 "LPGParser.g"
                this.setResult(
                    //#line 176 LPGParser.g
                    action_segmentList.action_segmentListfromElement(<action_segment>this.getRhsSym(1), true /* left recursive */)
                //#line 176 LPGParser.g
                );
            break;
            }
            //
            // Rule 97:  notice_segment ::= notice_segment action_segment
            //
            case 97: {
               //#line 176 "LPGParser.g"
                (<action_segmentList>this.getRhsSym(1)).addElement(<action_segment>this.getRhsSym(2));
            break;
            }
            //
            // Rule 98:  rules_segment ::= action_segment_list nonTermList
            //
            case 98: {
               //#line 179 "LPGParser.g"
                this.setResult(
                    //#line 179 LPGParser.g
                    new rules_segment(this.getLeftIToken(), this.getRightIToken(),
                                      //#line 179 LPGParser.g
                                      <action_segmentList>this.getRhsSym(1),
                                      //#line 179 LPGParser.g
                                      <nonTermList>this.getRhsSym(2))
                //#line 179 LPGParser.g
                );
            break;
            }
            //
            // Rule 99:  nonTermList ::= %Empty
            //
            case 99: {
               //#line 181 "LPGParser.g"
                this.setResult(
                    //#line 181 LPGParser.g
                    new nonTermList(this.getLeftIToken(), this.getRightIToken(), true /* left recursive */)
                //#line 181 LPGParser.g
                );
            break;
            }
            //
            // Rule 100:  nonTermList ::= nonTermList nonTerm
            //
            case 100: {
               //#line 181 "LPGParser.g"
                (<nonTermList>this.getRhsSym(1)).addElement(<nonTerm>this.getRhsSym(2));
            break;
            }
            //
            // Rule 101:  nonTerm ::= ruleNameWithAttributes produces ruleList
            //
            case 101: {
               //#line 183 "LPGParser.g"
                this.setResult(
                    //#line 183 LPGParser.g
                    new nonTerm(this.getLeftIToken(), this.getRightIToken(),
                                //#line 183 LPGParser.g
                                <RuleName>this.getRhsSym(1),
                                //#line 183 LPGParser.g
                                <Iproduces>this.getRhsSym(2),
                                //#line 183 LPGParser.g
                                <ruleList>this.getRhsSym(3))
                //#line 183 LPGParser.g
                );
            break;
            }
            //
            // Rule 102:  ruleNameWithAttributes ::= SYMBOL
            //
            case 102: {
               //#line 187 "LPGParser.g"
                this.setResult(
                    //#line 187 LPGParser.g
                    new RuleName(this.getLeftIToken(), this.getRightIToken(),
                                 //#line 187 LPGParser.g
                                 new ASTNodeToken(this.getRhsIToken(1)),
                                 //#line 187 LPGParser.g
                                 null,
                                 //#line 187 LPGParser.g
                                 null)
                //#line 187 LPGParser.g
                );
            break;
            }
            //
            // Rule 103:  ruleNameWithAttributes ::= SYMBOL MACRO_NAME$className
            //
            case 103: {
               //#line 188 "LPGParser.g"
                this.setResult(
                    //#line 188 LPGParser.g
                    new RuleName(this.getLeftIToken(), this.getRightIToken(),
                                 //#line 188 LPGParser.g
                                 new ASTNodeToken(this.getRhsIToken(1)),
                                 //#line 188 LPGParser.g
                                 new ASTNodeToken(this.getRhsIToken(2)),
                                 //#line 188 LPGParser.g
                                 null)
                //#line 188 LPGParser.g
                );
            break;
            }
            //
            // Rule 104:  ruleNameWithAttributes ::= SYMBOL MACRO_NAME$className MACRO_NAME$arrayElement
            //
            case 104: {
               //#line 189 "LPGParser.g"
                this.setResult(
                    //#line 189 LPGParser.g
                    new RuleName(this.getLeftIToken(), this.getRightIToken(),
                                 //#line 189 LPGParser.g
                                 new ASTNodeToken(this.getRhsIToken(1)),
                                 //#line 189 LPGParser.g
                                 new ASTNodeToken(this.getRhsIToken(2)),
                                 //#line 189 LPGParser.g
                                 new ASTNodeToken(this.getRhsIToken(3)))
                //#line 189 LPGParser.g
                );
            break;
            }
            //
            // Rule 105:  ruleList ::= rule
            //
            case 105: {
               //#line 203 "LPGParser.g"
                this.setResult(
                    //#line 203 LPGParser.g
                    ruleList.ruleListfromElement(<rule>this.getRhsSym(1), true /* left recursive */)
                //#line 203 LPGParser.g
                );
            break;
            }
            //
            // Rule 106:  ruleList ::= ruleList |$ rule
            //
            case 106: {
               //#line 203 "LPGParser.g"
                (<ruleList>this.getRhsSym(1)).addElement(<rule>this.getRhsSym(3));
            break;
            }
            //
            // Rule 107:  produces ::= ::=
            //
            case 107: {
               //#line 205 "LPGParser.g"
                this.setResult(
                    //#line 205 LPGParser.g
                    new produces0(this.getRhsIToken(1))
                //#line 205 LPGParser.g
                );
            break;
            }
            //
            // Rule 108:  produces ::= ::=?
            //
            case 108: {
               //#line 206 "LPGParser.g"
                this.setResult(
                    //#line 206 LPGParser.g
                    new produces1(this.getRhsIToken(1))
                //#line 206 LPGParser.g
                );
            break;
            }
            //
            // Rule 109:  produces ::= ->
            //
            case 109: {
               //#line 207 "LPGParser.g"
                this.setResult(
                    //#line 207 LPGParser.g
                    new produces2(this.getRhsIToken(1))
                //#line 207 LPGParser.g
                );
            break;
            }
            //
            // Rule 110:  produces ::= ->?
            //
            case 110: {
               //#line 208 "LPGParser.g"
                this.setResult(
                    //#line 208 LPGParser.g
                    new produces3(this.getRhsIToken(1))
                //#line 208 LPGParser.g
                );
            break;
            }
            //
            // Rule 111:  rule ::= symWithAttrsList action_segment_list
            //
            case 111: {
               //#line 210 "LPGParser.g"
                this.setResult(
                    //#line 210 LPGParser.g
                    new rule(this.getLeftIToken(), this.getRightIToken(),
                             //#line 210 LPGParser.g
                             <symWithAttrsList>this.getRhsSym(1),
                             //#line 210 LPGParser.g
                             <action_segmentList>this.getRhsSym(2))
                //#line 210 LPGParser.g
                );
            break;
            }
            //
            // Rule 112:  symWithAttrsList ::= %Empty
            //
            case 112: {
               //#line 212 "LPGParser.g"
                this.setResult(
                    //#line 212 LPGParser.g
                    new symWithAttrsList(this.getLeftIToken(), this.getRightIToken(), true /* left recursive */)
                //#line 212 LPGParser.g
                );
            break;
            }
            //
            // Rule 113:  symWithAttrsList ::= symWithAttrsList symWithAttrs
            //
            case 113: {
               //#line 212 "LPGParser.g"
                (<symWithAttrsList>this.getRhsSym(1)).addElement(<IsymWithAttrs>this.getRhsSym(2));
            break;
            }
            //
            // Rule 114:  symWithAttrs ::= EMPTY_KEY
            //
            case 114: {
               //#line 214 "LPGParser.g"
                this.setResult(
                    //#line 214 LPGParser.g
                    new symWithAttrs0(this.getRhsIToken(1))
                //#line 214 LPGParser.g
                );
            break;
            }
            //
            // Rule 115:  symWithAttrs ::= SYMBOL optAttrList
            //
            case 115: {
               //#line 215 "LPGParser.g"
                this.setResult(
                    //#line 215 LPGParser.g
                    new symWithAttrs1(this.getLeftIToken(), this.getRightIToken(),
                                      //#line 215 LPGParser.g
                                      new ASTNodeToken(this.getRhsIToken(1)),
                                      //#line 215 LPGParser.g
                                      <symAttrs>this.getRhsSym(2))
                //#line 215 LPGParser.g
                );
            break;
            }
            //
            // Rule 116:  optAttrList ::= %Empty
            //
            case 116: {
               //#line 218 "LPGParser.g"
                this.setResult(
                    //#line 218 LPGParser.g
                    new symAttrs(this.getLeftIToken(), this.getRightIToken(),
                                 //#line 218 LPGParser.g
                                 null)
                //#line 218 LPGParser.g
                );
            break;
            }
            //
            // Rule 117:  optAttrList ::= MACRO_NAME
            //
            case 117: {
               //#line 219 "LPGParser.g"
                this.setResult(
                    //#line 219 LPGParser.g
                    new symAttrs(this.getLeftIToken(), this.getRightIToken(),
                                 //#line 219 LPGParser.g
                                 new ASTNodeToken(this.getRhsIToken(1)))
                //#line 219 LPGParser.g
                );
            break;
            }
            //
            // Rule 118:  opt_action_segment ::= %Empty
            //
            case 118: {
               //#line 221 "LPGParser.g"
                this.setResult(null);
            break;
            }
            //
            // Rule 119:  opt_action_segment ::= action_segment
            //
            case 119:
                break;
            //
            // Rule 120:  action_segment ::= BLOCK
            //
            case 120: {
               //#line 223 "LPGParser.g"
                this.setResult(
                    //#line 223 LPGParser.g
                    new action_segment(this.getRhsIToken(1))
                //#line 223 LPGParser.g
                );
            break;
            }
            //
            // Rule 121:  start_segment ::= start_symbol
            //
            case 121: {
               //#line 227 "LPGParser.g"
                this.setResult(
                    //#line 227 LPGParser.g
                    start_symbolList.start_symbolListfromElement(<Istart_symbol>this.getRhsSym(1), true /* left recursive */)
                //#line 227 LPGParser.g
                );
            break;
            }
            //
            // Rule 122:  start_segment ::= start_segment start_symbol
            //
            case 122: {
               //#line 227 "LPGParser.g"
                (<start_symbolList>this.getRhsSym(1)).addElement(<Istart_symbol>this.getRhsSym(2));
            break;
            }
            //
            // Rule 123:  start_symbol ::= SYMBOL
            //
            case 123: {
               //#line 228 "LPGParser.g"
                this.setResult(
                    //#line 228 LPGParser.g
                    new start_symbol0(this.getRhsIToken(1))
                //#line 228 LPGParser.g
                );
            break;
            }
            //
            // Rule 124:  start_symbol ::= MACRO_NAME
            //
            case 124: {
               //#line 229 "LPGParser.g"
                this.setResult(
                    //#line 229 LPGParser.g
                    new start_symbol1(this.getRhsIToken(1))
                //#line 229 LPGParser.g
                );
            break;
            }
            //
            // Rule 125:  terminals_segment ::= terminal
            //
            case 125: {
               //#line 232 "LPGParser.g"
                this.setResult(
                    //#line 232 LPGParser.g
                    terminals_segment_terminalList.terminals_segment_terminalListfromElement(this, <terminal>this.getRhsSym(1), true /* left recursive */)
                //#line 232 LPGParser.g
                );
            break;
            }
            //
            // Rule 126:  terminals_segment ::= terminals_segment terminal
            //
            case 126: {
               //#line 232 "LPGParser.g"
                (<terminals_segment_terminalList>this.getRhsSym(1)).addElement(<terminal>this.getRhsSym(2));
            break;
            }
            //
            // Rule 127:  terminal ::= terminal_symbol optTerminalAlias
            //
            case 127: {
               //#line 237 "LPGParser.g"
                this.setResult(
                    //#line 237 LPGParser.g
                    new terminal(this.getLeftIToken(), this.getRightIToken(),
                                 //#line 237 LPGParser.g
                                 <Iterminal_symbol>this.getRhsSym(1),
                                 //#line 237 LPGParser.g
                                 <optTerminalAlias>this.getRhsSym(2))
                //#line 237 LPGParser.g
                );
            break;
            }
            //
            // Rule 128:  optTerminalAlias ::= %Empty
            //
            case 128: {
               //#line 239 "LPGParser.g"
                this.setResult(null);
            break;
            }
            //
            // Rule 129:  optTerminalAlias ::= produces name
            //
            case 129: {
               //#line 239 "LPGParser.g"
                this.setResult(
                    //#line 239 LPGParser.g
                    new optTerminalAlias(this.getLeftIToken(), this.getRightIToken(),
                                         //#line 239 LPGParser.g
                                         <Iproduces>this.getRhsSym(1),
                                         //#line 239 LPGParser.g
                                         <Iname>this.getRhsSym(2))
                //#line 239 LPGParser.g
                );
            break;
            }
            //
            // Rule 130:  terminal_symbol ::= SYMBOL
            //
            case 130: {
               //#line 241 "LPGParser.g"
                this.setResult(
                    //#line 241 LPGParser.g
                    new terminal_symbol0(this.getRhsIToken(1))
                //#line 241 LPGParser.g
                );
            break;
            }
            //
            // Rule 131:  terminal_symbol ::= MACRO_NAME
            //
            case 131: {
               //#line 243 "LPGParser.g"
                this.setResult(
                    //#line 243 LPGParser.g
                    new terminal_symbol1(this.getRhsIToken(1))
                //#line 243 LPGParser.g
                );
            break;
            }
            //
            // Rule 132:  trailers_segment ::= action_segment_list
            //
            case 132:
                break;
            //
            // Rule 133:  types_segment ::= type_declarations
            //
            case 133: {
               //#line 249 "LPGParser.g"
                this.setResult(
                    //#line 249 LPGParser.g
                    type_declarationsList.type_declarationsListfromElement(<type_declarations>this.getRhsSym(1), true /* left recursive */)
                //#line 249 LPGParser.g
                );
            break;
            }
            //
            // Rule 134:  types_segment ::= types_segment type_declarations
            //
            case 134: {
               //#line 249 "LPGParser.g"
                (<type_declarationsList>this.getRhsSym(1)).addElement(<type_declarations>this.getRhsSym(2));
            break;
            }
            //
            // Rule 135:  type_declarations ::= SYMBOL produces barSymbolList opt_action_segment
            //
            case 135: {
               //#line 251 "LPGParser.g"
                this.setResult(
                    //#line 251 LPGParser.g
                    new type_declarations(this.getLeftIToken(), this.getRightIToken(),
                                          //#line 251 LPGParser.g
                                          new ASTNodeToken(this.getRhsIToken(1)),
                                          //#line 251 LPGParser.g
                                          <Iproduces>this.getRhsSym(2),
                                          //#line 251 LPGParser.g
                                          <SYMBOLList>this.getRhsSym(3),
                                          //#line 251 LPGParser.g
                                          <action_segment>this.getRhsSym(4))
                //#line 251 LPGParser.g
                );
            break;
            }
            //
            // Rule 136:  barSymbolList ::= SYMBOL
            //
            case 136: {
               //#line 252 "LPGParser.g"
                this.setResult(
                    //#line 252 LPGParser.g
                    SYMBOLList.SYMBOLListfromElement(new ASTNodeToken(this.getRhsIToken(1)), true /* left recursive */)
                //#line 252 LPGParser.g
                );
            break;
            }
            //
            // Rule 137:  barSymbolList ::= barSymbolList |$ SYMBOL
            //
            case 137: {
               //#line 252 "LPGParser.g"
                (<SYMBOLList>this.getRhsSym(1)).addElement(new ASTNodeToken(this.getRhsIToken(3)));
            break;
            }
            //
            // Rule 138:  predecessor_segment ::= %Empty
            //
            case 138: {
               //#line 255 "LPGParser.g"
                this.setResult(
                    //#line 255 LPGParser.g
                    new symbol_pairList(this.getLeftIToken(), this.getRightIToken(), true /* left recursive */)
                //#line 255 LPGParser.g
                );
            break;
            }
            //
            // Rule 139:  predecessor_segment ::= predecessor_segment symbol_pair
            //
            case 139: {
               //#line 255 "LPGParser.g"
                (<symbol_pairList>this.getRhsSym(1)).addElement(<symbol_pair>this.getRhsSym(2));
            break;
            }
            //
            // Rule 140:  symbol_pair ::= SYMBOL SYMBOL
            //
            case 140: {
               //#line 257 "LPGParser.g"
                this.setResult(
                    //#line 257 LPGParser.g
                    new symbol_pair(this.getLeftIToken(), this.getRightIToken(),
                                    //#line 257 LPGParser.g
                                    new ASTNodeToken(this.getRhsIToken(1)),
                                    //#line 257 LPGParser.g
                                    new ASTNodeToken(this.getRhsIToken(2)))
                //#line 257 LPGParser.g
                );
            break;
            }
            //
            // Rule 141:  recover_segment ::= %Empty
            //
            case 141: {
               //#line 260 "LPGParser.g"
                this.setResult(
                    //#line 260 LPGParser.g
                    new SYMBOLList(this.getLeftIToken(), this.getRightIToken(), true /* left recursive */)
                //#line 260 LPGParser.g
                );
            break;
            }
            //
            // Rule 142:  recover_segment ::= recover_segment recover_symbol
            //
            case 142: {
               //#line 260 "LPGParser.g"
                this.setResult(<SYMBOLList>this.getRhsSym(1));
            break;
            }
            //
            // Rule 143:  recover_symbol ::= SYMBOL
            //
            case 143: {
               //#line 262 "LPGParser.g"
                this.setResult(
                    //#line 262 LPGParser.g
                    new recover_symbol(this.getRhsIToken(1))
                //#line 262 LPGParser.g
                );
            break;
            }
            //
            // Rule 144:  END_KEY_OPT ::= %Empty
            //
            case 144: {
               //#line 265 "LPGParser.g"
                this.setResult(null);
            break;
            }
            //
            // Rule 145:  END_KEY_OPT ::= END_KEY
            //
            case 145: {
               //#line 266 "LPGParser.g"
                this.setResult(
                    //#line 266 LPGParser.g
                    new END_KEY_OPT(this.getRhsIToken(1))
                //#line 266 LPGParser.g
                );
            break;
            }
            //
            // Rule 146:  action_segment_list ::= %Empty
            //
            case 146: {
               //#line 268 "LPGParser.g"
                this.setResult(
                    //#line 268 LPGParser.g
                    new action_segmentList(this.getLeftIToken(), this.getRightIToken(), true /* left recursive */)
                //#line 268 LPGParser.g
                );
            break;
            }
            //
            // Rule 147:  action_segment_list ::= action_segment_list action_segment
            //
            case 147: {
               //#line 269 "LPGParser.g"
                (<action_segmentList>this.getRhsSym(1)).addElement(<action_segment>this.getRhsSym(2));
            break;
            }
    //#line 313 "btParserTemplateF.gi

    
            default:
                break;
        }
        return;
    }
}
    export abstract class ASTNode implements IAst
    {
        public getNextAst() : IAst | null { return null; }
        protected leftIToken : IToken ;
        protected rightIToken: IToken ;
        protected parent : IAst | null = null;
        public  setParent(parent : IAst ) : void { this.parent = parent; }
        public  getParent() : IAst | null{ return this.parent; }

        public getLeftIToken() : IToken { return this.leftIToken; }
        public getRightIToken() : IToken { return this.rightIToken; }
        public getPrecedingAdjuncts() : IToken[] { return this.leftIToken.getPrecedingAdjuncts(); }
        public getFollowingAdjuncts() : IToken[] { return this.rightIToken.getFollowingAdjuncts(); }

        public  toString() : string 
        {
            let str = this.leftIToken.getILexStream()?.toString(this.leftIToken.getStartOffset(), this.rightIToken.getEndOffset());
            return str? str : "";
        }

    constructor(leftIToken : IToken , rightIToken? : IToken )
        {
            this.leftIToken = leftIToken;
            if(rightIToken) this.rightIToken = rightIToken;
            else            this.rightIToken = leftIToken;
        }

      public   initialize() : void {}

        /**
         * A list of all children of this node, excluding the null ones.
         */
        public  getChildren() : Lpg.Util.ArrayList<IAst>
        {
             let list = this.getAllChildren() ;
            let k = -1;
            for (let i = 0; i < list.size(); i++)
            {
                let element = list.get(i);
                if (element)
                {
                    if (++k != i)
                        list.set(k, element);
                }
            }
            for (let i = list.size() - 1; i > k; i--) // remove extraneous elements
                list.remove(i);
            return list;
        }

        /**
         * A list of all children of this node, don't including the null ones.
         */
        public abstract  getAllChildren() : Lpg.Util.ArrayList<IAst>;

        public abstract accept(v : IAstVisitor ) : void;
    }

    export abstract class AbstractASTNodeList extends ASTNode implements IAbstractArrayList<ASTNode>
    {
        private leftRecursive : boolean ;
        public  list  = new Lpg.Util.ArrayList<ASTNode>();
        public  size() : number { return this.list.size(); }
        public   getList() : Lpg.Util.ArrayList<ASTNode    > { return this.list; }
        public  getElementAt(i : number ) : ASTNode { return <ASTNode> this.list.get(this.leftRecursive ? i : this.list.size() - 1 - i); }
        public  getArrayList() : Lpg.Util.ArrayList<ASTNode>
        {
            if (! this.leftRecursive) // reverse the list 
            {
                for (let i = 0, n = this.list.size() - 1; i < n; i++, n--)
                {
                    let ith = this.list.get(i),
                           nth = this.list.get(n);
                    this.list.set(i, nth);
                    this.list.set(n, ith);
                }
                this.leftRecursive = true;
            }
            return this.list;
        }
        /**
         * @deprecated replaced by {@link #addElement()}
         *
         */
        public  add(element : ASTNode) : boolean
        {
            this.addElement(element);
            return true;
        }

        public  addElement(element : ASTNode) : void
        {
            this.list.add(element);
            if (this.leftRecursive)
                 this.rightIToken = element.getRightIToken();
            else this.leftIToken = element.getLeftIToken();
        }

        constructor(leftToken : IToken, rightToken : IToken , leftRecursive : boolean )        {
              super(leftToken, rightToken);
              this.leftRecursive = leftRecursive;
        }

        /**
         * Make a copy of the list and return it. Note that we obtain the local list by
         * invoking getArrayList so as to make sure that the list we return is in proper order.
         */
         public   getAllChildren() : Lpg.Util.ArrayList<IAst>
        {
            return this.getArrayList().clone();
        }

    }

    export class ASTNodeToken extends ASTNode implements IASTNodeToken
    {
        constructor(token : IToken ) { super(token); }
        public  getIToken() : IToken{ return this.leftIToken; }
        public  toString() : string  { return this.leftIToken.toString(); }

        /**
         * A token class has no children. So, we return the empty list.
         */
         public   getAllChildren() : Lpg.Util.ArrayList<IAst> { return new Lpg.Util.ArrayList<IAst>(); }


        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            v.visitASTNodeToken(this);
            v.endVisitASTNodeToken(this);
        }
    }

    export interface IRootForLPGParser
    {
         getLeftIToken() : IToken;
         getRightIToken() : IToken;

        accept(v : IAstVisitor ) : void;
    }

    /**
     * is always implemented by <b>ASTNodeToken</b>. It is also implemented by:
     *<b>
     *<ul>
     *<li>alias_lhs_macro_name
     *<li>macro_segment
     *<li>optMacroName
     *<li>include_segment
     *<li>RuleName
     *<li>symAttrs
     *<li>action_segment
     *<li>recover_symbol
     *<li>END_KEY_OPT
     *<li>alias_rhs0
     *<li>alias_rhs1
     *<li>alias_rhs2
     *<li>alias_rhs3
     *<li>alias_rhs4
     *<li>alias_rhs5
     *<li>alias_rhs6
     *<li>macro_name_symbol0
     *<li>macro_name_symbol1
     *<li>name0
     *<li>name1
     *<li>name2
     *<li>name3
     *<li>name4
     *<li>name5
     *<li>produces0
     *<li>produces1
     *<li>produces2
     *<li>produces3
     *<li>symWithAttrs0
     *<li>symWithAttrs1
     *<li>start_symbol0
     *<li>start_symbol1
     *<li>terminal_symbol0
     *<li>terminal_symbol1
     *</ul>
     *</b>
     */
    export interface IASTNodeToken extends IRootForLPGParser    {
    }

    /**
     * is implemented by <b>LPG</b>
     */
    export interface ILPG extends IRootForLPGParser    {
    }

    /**
     * is implemented by <b>option_specList</b>
     */
    export interface Ioptions_segment extends IRootForLPGParser    {
    }

    /**
     * is implemented by <b>LPG_itemList</b>
     */
    export interface ILPG_INPUT extends IRootForLPGParser    {
    }

    /**
     * is implemented by:
     *<b>
     *<ul>
     *<li>AliasSeg
     *<li>AstSeg
     *<li>DefineSeg
     *<li>EofSeg
     *<li>EolSeg
     *<li>ErrorSeg
     *<li>ExportSeg
     *<li>GlobalsSeg
     *<li>HeadersSeg
     *<li>IdentifierSeg
     *<li>ImportSeg
     *<li>IncludeSeg
     *<li>KeywordsSeg
     *<li>NamesSeg
     *<li>NoticeSeg
     *<li>RulesSeg
     *<li>SoftKeywordsSeg
     *<li>StartSeg
     *<li>TerminalsSeg
     *<li>TrailersSeg
     *<li>TypesSeg
     *<li>RecoverSeg
     *<li>PredecessorSeg
     *</ul>
     *</b>
     */
    export interface ILPG_item extends IRootForLPGParser    {
    }

    /**
     * is implemented by <b>aliasSpecList</b>
     */
    export interface Ialias_segment extends IRootForLPGParser    {
    }

    /**
     * is always implemented by <b>ASTNodeToken</b>. It is also implemented by <b>END_KEY_OPT</b>
     */
    export interface IEND_KEY_OPT extends IASTNodeToken {}

    /**
     * is implemented by <b>action_segmentList</b>
     */
    export interface Iast_segment extends IRootForLPGParser    {
    }

    /**
     * is implemented by <b>defineSpecList</b>
     */
    export interface Idefine_segment extends IRootForLPGParser    {
    }

    /**
     * is always implemented by <b>ASTNodeToken</b>. It is also implemented by:
     *<b>
     *<ul>
     *<li>terminal_symbol0
     *<li>terminal_symbol1
     *</ul>
     *</b>
     */
    export interface Ieof_segment extends IRootForLPGParser    {
    }

    /**
     * is always implemented by <b>ASTNodeToken</b>. It is also implemented by:
     *<b>
     *<ul>
     *<li>terminal_symbol0
     *<li>terminal_symbol1
     *</ul>
     *</b>
     */
    export interface Ieol_segment extends IRootForLPGParser    {
    }

    /**
     * is always implemented by <b>ASTNodeToken</b>. It is also implemented by:
     *<b>
     *<ul>
     *<li>terminal_symbol0
     *<li>terminal_symbol1
     *</ul>
     *</b>
     */
    export interface Ierror_segment extends IRootForLPGParser    {
    }

    /**
     * is implemented by <b>terminal_symbolList</b>
     */
    export interface Iexport_segment extends IRootForLPGParser    {
    }

    /**
     * is implemented by <b>action_segmentList</b>
     */
    export interface Iglobals_segment extends IRootForLPGParser    {
    }

    /**
     * is implemented by <b>action_segmentList</b>
     */
    export interface Iheaders_segment extends IRootForLPGParser    {
    }

    /**
     * is always implemented by <b>ASTNodeToken</b>. It is also implemented by:
     *<b>
     *<ul>
     *<li>terminal_symbol0
     *<li>terminal_symbol1
     *</ul>
     *</b>
     */
    export interface Iidentifier_segment extends IRootForLPGParser    {
    }

    /**
     * is implemented by <b>import_segment</b>
     */
    export interface Iimport_segment extends IRootForLPGParser    {
    }

    /**
     * is always implemented by <b>ASTNodeToken</b>. It is also implemented by <b>include_segment</b>
     */
    export interface Iinclude_segment extends IASTNodeToken {}

    /**
     * is implemented by <b>keywordSpecList</b>
     */
    export interface Ikeywords_segment extends IRootForLPGParser    {
    }

    /**
     * is implemented by <b>nameSpecList</b>
     */
    export interface Inames_segment extends IRootForLPGParser    {
    }

    /**
     * is implemented by <b>action_segmentList</b>
     */
    export interface Inotice_segment extends IRootForLPGParser    {
    }

    /**
     * is implemented by <b>rules_segment</b>
     */
    export interface Irules_segment extends IRootForLPGParser    {
    }

    /**
     * is implemented by <b>start_symbolList</b>
     */
    export interface Istart_segment extends IRootForLPGParser    {
    }

    /**
     * is implemented by <b>terminalList</b>
     */
    export interface Iterminals_segment extends IRootForLPGParser    {
    }

    /**
     * is implemented by <b>action_segmentList</b>
     */
    export interface Itrailers_segment extends IRootForLPGParser    {
    }

    /**
     * is implemented by <b>type_declarationsList</b>
     */
    export interface Itypes_segment extends IRootForLPGParser    {
    }

    /**
     * is implemented by <b>SYMBOLList</b>
     */
    export interface Irecover_segment extends IRootForLPGParser    {
    }

    /**
     * is implemented by <b>symbol_pairList</b>
     */
    export interface Ipredecessor_segment extends IRootForLPGParser    {
    }

    /**
     * is implemented by <b>option_spec</b>
     */
    export interface Ioption_spec extends IRootForLPGParser    {
    }

    /**
     * is implemented by <b>optionList</b>
     */
    export interface Ioption_list extends IRootForLPGParser    {
    }

    /**
     * is implemented by <b>option</b>
     */
    export interface Ioption extends IRootForLPGParser    {
    }

    /**
     * is implemented by:
     *<b>
     *<ul>
     *<li>option_value0
     *<li>option_value1
     *</ul>
     *</b>
     */
    export interface Ioption_value extends IRootForLPGParser    {
    }

    /**
     * is implemented by <b>SYMBOLList</b>
     */
    export interface Isymbol_list extends IRootForLPGParser    {
    }

    /**
     * is implemented by:
     *<b>
     *<ul>
     *<li>aliasSpec0
     *<li>aliasSpec1
     *<li>aliasSpec2
     *<li>aliasSpec3
     *<li>aliasSpec4
     *<li>aliasSpec5
     *</ul>
     *</b>
     */
    export interface IaliasSpec extends IRootForLPGParser    {
    }

    /**
     * is always implemented by <b>ASTNodeToken</b>. It is also implemented by:
     *<b>
     *<ul>
     *<li>produces0
     *<li>produces1
     *<li>produces2
     *<li>produces3
     *</ul>
     *</b>
     */
    export interface Iproduces extends IASTNodeToken {}

    /**
     * is always implemented by <b>ASTNodeToken</b>. It is also implemented by:
     *<b>
     *<ul>
     *<li>alias_rhs0
     *<li>alias_rhs1
     *<li>alias_rhs2
     *<li>alias_rhs3
     *<li>alias_rhs4
     *<li>alias_rhs5
     *<li>alias_rhs6
     *</ul>
     *</b>
     */
    export interface Ialias_rhs extends IASTNodeToken {}

    /**
     * is always implemented by <b>ASTNodeToken</b>. It is also implemented by <b>alias_lhs_macro_name</b>
     */
    export interface Ialias_lhs_macro_name extends IASTNodeToken {}

    /**
     * is implemented by <b>action_segmentList</b>
     */
    export interface Iaction_segment_list extends Iast_segment, Iheaders_segment, Itrailers_segment {}

    /**
     * is implemented by <b>defineSpec</b>
     */
    export interface IdefineSpec extends IRootForLPGParser    {
    }

    /**
     * is always implemented by <b>ASTNodeToken</b>. It is also implemented by:
     *<b>
     *<ul>
     *<li>macro_name_symbol0
     *<li>macro_name_symbol1
     *</ul>
     *</b>
     */
    export interface Imacro_name_symbol extends IASTNodeToken {}

    /**
     * is always implemented by <b>ASTNodeToken</b>. It is also implemented by <b>macro_segment</b>
     */
    export interface Imacro_segment extends IASTNodeToken {}

    /**
     * is always implemented by <b>ASTNodeToken</b>. It is also implemented by:
     *<b>
     *<ul>
     *<li>terminal_symbol0
     *<li>terminal_symbol1
     *</ul>
     *</b>
     */
    export interface Iterminal_symbol extends Ieol_segment, Ieof_segment, Ierror_segment, Iidentifier_segment, IkeywordSpec, IASTNodeToken {}

    /**
     * is always implemented by <b>ASTNodeToken</b>. It is also implemented by <b>action_segment</b>
     */
    export interface Iaction_segment extends Iopt_action_segment, IASTNodeToken {}

    /**
     * is implemented by <b>drop_commandList</b>
     */
    export interface Idrop_command_list extends IRootForLPGParser    {
    }

    /**
     * is implemented by:
     *<b>
     *<ul>
     *<li>drop_command0
     *<li>drop_command1
     *</ul>
     *</b>
     */
    export interface Idrop_command extends IRootForLPGParser    {
    }

    /**
     * is implemented by <b>SYMBOLList</b>
     */
    export interface Idrop_symbols extends IRootForLPGParser    {
    }

    /**
     * is implemented by <b>drop_ruleList</b>
     */
    export interface Idrop_rules extends IRootForLPGParser    {
    }

    /**
     * is implemented by <b>drop_rule</b>
     */
    export interface Idrop_rule extends IRootForLPGParser    {
    }

    /**
     * is always implemented by <b>ASTNodeToken</b>. It is also implemented by <b>optMacroName</b>
     */
    export interface IoptMacroName extends IASTNodeToken {}

    /**
     * is implemented by <b>ruleList</b>
     */
    export interface IruleList extends IRootForLPGParser    {
    }

    /**
     * is implemented by:
     *<b>
     *<ul>
     *<li>keywordSpec
     *<li>terminal_symbol0
     *<li>terminal_symbol1
     *</ul>
     *</b>
     */
    export interface IkeywordSpec extends IRootForLPGParser    {
    }

    /**
     * is always implemented by <b>ASTNodeToken</b>. It is also implemented by:
     *<b>
     *<ul>
     *<li>name0
     *<li>name1
     *<li>name2
     *<li>name3
     *<li>name4
     *<li>name5
     *</ul>
     *</b>
     */
    export interface Iname extends IASTNodeToken {}

    /**
     * is implemented by <b>nameSpec</b>
     */
    export interface InameSpec extends IRootForLPGParser    {
    }

    /**
     * is implemented by <b>nonTermList</b>
     */
    export interface InonTermList extends IRootForLPGParser    {
    }

    /**
     * is implemented by <b>nonTerm</b>
     */
    export interface InonTerm extends IRootForLPGParser    {
    }

    /**
     * is implemented by <b>RuleName</b>
     */
    export interface IruleNameWithAttributes extends IASTNodeToken {}

    /**
     * is implemented by <b>rule</b>
     */
    export interface Irule extends IRootForLPGParser    {
    }

    /**
     * is implemented by <b>symWithAttrsList</b>
     */
    export interface IsymWithAttrsList extends IRootForLPGParser    {
    }

    /**
     * is implemented by:
     *<b>
     *<ul>
     *<li>symWithAttrs0
     *<li>symWithAttrs1
     *</ul>
     *</b>
     */
    export interface IsymWithAttrs extends IASTNodeToken {}

    /**
     * is implemented by <b>symAttrs</b>
     */
    export interface IoptAttrList extends IASTNodeToken {}

    /**
     * is always implemented by <b>ASTNodeToken</b>. It is also implemented by <b>action_segment</b>
     */
    export interface Iopt_action_segment extends IRootForLPGParser    {
    }

    /**
     * is always implemented by <b>ASTNodeToken</b>. It is also implemented by:
     *<b>
     *<ul>
     *<li>start_symbol0
     *<li>start_symbol1
     *</ul>
     *</b>
     */
    export interface Istart_symbol extends IASTNodeToken {}

    /**
     * is implemented by <b>terminal</b>
     */
    export interface Iterminal extends IRootForLPGParser    {
    }

    /**
     * is implemented by <b>optTerminalAlias</b>
     */
    export interface IoptTerminalAlias extends IRootForLPGParser    {
    }

    /**
     * is implemented by <b>type_declarations</b>
     */
    export interface Itype_declarations extends IRootForLPGParser    {
    }

    /**
     * is implemented by <b>SYMBOLList</b>
     */
    export interface IbarSymbolList extends IRootForLPGParser    {
    }

    /**
     * is implemented by <b>symbol_pair</b>
     */
    export interface Isymbol_pair extends IRootForLPGParser    {
    }

    /**
     * is always implemented by <b>ASTNodeToken</b>. It is also implemented by <b>recover_symbol</b>
     */
    export interface Irecover_symbol extends IASTNodeToken {}

    /**
     *<b>
    *<li>Rule 1:  LPG ::= options_segment LPG_INPUT
     *</b>
     */
    export class LPG extends ASTNode implements ILPG
    {
        private  _options_segment : option_specList;
        private  _LPG_INPUT : LPG_itemList;

        public  getoptions_segment() : option_specList{ return this._options_segment; }
        public  setoptions_segment( _options_segment : option_specList) : void { this._options_segment = _options_segment; }
        public  getLPG_INPUT() : LPG_itemList{ return this._LPG_INPUT; }
        public  setLPG_INPUT( _LPG_INPUT : LPG_itemList) : void { this._LPG_INPUT = _LPG_INPUT; }

        constructor(leftIToken : IToken , rightIToken : IToken ,
                     _options_segment : option_specList,
                     _LPG_INPUT : LPG_itemList)
        {
            super(leftIToken, rightIToken)

            this._options_segment = _options_segment;
            (<ASTNode> _options_segment).setParent(this);
            this._LPG_INPUT = _LPG_INPUT;
            (<ASTNode> _LPG_INPUT).setParent(this);
            this.initialize();
        }

        /**
         * A list of all children of this node, don't including the null ones.
         */
         public   getAllChildren() : Lpg.Util.ArrayList<IAst>
        {
            let list = new Lpg.Util.ArrayList<IAst>();
            if(this._options_segment)  list.add(this._options_segment);
            if(this._LPG_INPUT)  list.add(this._LPG_INPUT);
            return list;
        }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            let checkChildren = v.visitLPG(this);
            if (checkChildren)
            {
                this._options_segment.accept(v);
                this._LPG_INPUT.accept(v);
            }
            v.endVisitLPG(this);
        }
    }

    /**
     *<b>
    *<li>Rule 2:  LPG_INPUT ::= %Empty
    *<li>Rule 3:  LPG_INPUT ::= LPG_INPUT LPG_item
     *</b>
     */
    export class LPG_itemList extends AbstractASTNodeList implements ILPG_INPUT
    {
        public  getLPG_itemAt(i : number) : ILPG_item{ return <ILPG_item> this.getElementAt(i); }

        constructor(leftToken : IToken, rightToken : IToken , leftRecursive : boolean )
        {
            super(leftToken, rightToken, leftRecursive);
        }

       public static LPG_itemListfromElement(element : ILPG_item,leftRecursive : boolean) : LPG_itemList
        {
            let obj = new LPG_itemList(element.getLeftIToken(),element.getRightIToken(), leftRecursive);
            obj.list.add(element);
            (<ASTNode> element).setParent(obj);
            return obj;
        }

        public  addElement( _LPG_item : ILPG_item) : void
        {
            super.addElement(<ASTNode> _LPG_item);
            (<ASTNode> _LPG_item).setParent(this);
        }


        public  accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }
        public enter(v : Visitor) : void
        {
            let checkChildren = v.visitLPG_itemList(this);
            if (checkChildren)
            {
                for (let i = 0; i < this.size(); i++)
                {
                    let element = this.getLPG_itemAt(i);
                    element.accept(v);
                }
            }
            v.endVisitLPG_itemList(this);
        }
    }

    /**
     *<b>
    *<li>Rule 4:  LPG_item ::= ALIAS_KEY$ alias_segment END_KEY_OPT$
     *</b>
     */
    export class AliasSeg extends ASTNode implements ILPG_item
    {
        private  _alias_segment : aliasSpecList;

        public  getalias_segment() : aliasSpecList{ return this._alias_segment; }
        public  setalias_segment( _alias_segment : aliasSpecList) : void { this._alias_segment = _alias_segment; }

        constructor(leftIToken : IToken , rightIToken : IToken ,
                     _alias_segment : aliasSpecList)
        {
            super(leftIToken, rightIToken)

            this._alias_segment = _alias_segment;
            (<ASTNode> _alias_segment).setParent(this);
            this.initialize();
        }

        /**
         * A list of all children of this node, don't including the null ones.
         */
         public   getAllChildren() : Lpg.Util.ArrayList<IAst>
        {
            let list = new Lpg.Util.ArrayList<IAst>();
            if(this._alias_segment)  list.add(this._alias_segment);
            return list;
        }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            let checkChildren = v.visitAliasSeg(this);
            if (checkChildren)
                this._alias_segment.accept(v);
            v.endVisitAliasSeg(this);
        }
    }

    /**
     *<b>
    *<li>Rule 5:  LPG_item ::= AST_KEY$ ast_segment END_KEY_OPT$
     *</b>
     */
    export class AstSeg extends ASTNode implements ILPG_item
    {
        private  _ast_segment : action_segmentList;

        public  getast_segment() : action_segmentList{ return this._ast_segment; }
        public  setast_segment( _ast_segment : action_segmentList) : void { this._ast_segment = _ast_segment; }

        constructor(leftIToken : IToken , rightIToken : IToken ,
                     _ast_segment : action_segmentList)
        {
            super(leftIToken, rightIToken)

            this._ast_segment = _ast_segment;
            (<ASTNode> _ast_segment).setParent(this);
            this.initialize();
        }

        /**
         * A list of all children of this node, don't including the null ones.
         */
         public   getAllChildren() : Lpg.Util.ArrayList<IAst>
        {
            let list = new Lpg.Util.ArrayList<IAst>();
            if(this._ast_segment)  list.add(this._ast_segment);
            return list;
        }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            let checkChildren = v.visitAstSeg(this);
            if (checkChildren)
                this._ast_segment.accept(v);
            v.endVisitAstSeg(this);
        }
    }

    /**
     *<b>
    *<li>Rule 6:  LPG_item ::= DEFINE_KEY$ define_segment END_KEY_OPT$
     *</b>
     */
    export class DefineSeg extends ASTNode implements ILPG_item
    {
        private  _define_segment : defineSpecList;

        public  getdefine_segment() : defineSpecList{ return this._define_segment; }
        public  setdefine_segment( _define_segment : defineSpecList) : void { this._define_segment = _define_segment; }

        constructor(leftIToken : IToken , rightIToken : IToken ,
                     _define_segment : defineSpecList)
        {
            super(leftIToken, rightIToken)

            this._define_segment = _define_segment;
            (<ASTNode> _define_segment).setParent(this);
            this.initialize();
        }

        /**
         * A list of all children of this node, don't including the null ones.
         */
         public   getAllChildren() : Lpg.Util.ArrayList<IAst>
        {
            let list = new Lpg.Util.ArrayList<IAst>();
            if(this._define_segment)  list.add(this._define_segment);
            return list;
        }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            let checkChildren = v.visitDefineSeg(this);
            if (checkChildren)
                this._define_segment.accept(v);
            v.endVisitDefineSeg(this);
        }
    }

    /**
     *<b>
    *<li>Rule 7:  LPG_item ::= EOF_KEY$ eof_segment END_KEY_OPT$
     *</b>
     */
    export class EofSeg extends ASTNode implements ILPG_item
    {
        private  _eof_segment : Ieof_segment;

        public  geteof_segment() : Ieof_segment{ return this._eof_segment; }
        public  seteof_segment( _eof_segment : Ieof_segment) : void { this._eof_segment = _eof_segment; }

        constructor(leftIToken : IToken , rightIToken : IToken ,
                     _eof_segment : Ieof_segment)
        {
            super(leftIToken, rightIToken)

            this._eof_segment = _eof_segment;
            (<ASTNode> _eof_segment).setParent(this);
            this.initialize();
        }

        /**
         * A list of all children of this node, don't including the null ones.
         */
         public   getAllChildren() : Lpg.Util.ArrayList<IAst>
        {
            let list = new Lpg.Util.ArrayList<IAst>();
            if(this._eof_segment)  list.add(this._eof_segment);
            return list;
        }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            let checkChildren = v.visitEofSeg(this);
            if (checkChildren)
                this._eof_segment.accept(v);
            v.endVisitEofSeg(this);
        }
    }

    /**
     *<b>
    *<li>Rule 8:  LPG_item ::= EOL_KEY$ eol_segment END_KEY_OPT$
     *</b>
     */
    export class EolSeg extends ASTNode implements ILPG_item
    {
        private  _eol_segment : Ieol_segment;

        public  geteol_segment() : Ieol_segment{ return this._eol_segment; }
        public  seteol_segment( _eol_segment : Ieol_segment) : void { this._eol_segment = _eol_segment; }

        constructor(leftIToken : IToken , rightIToken : IToken ,
                     _eol_segment : Ieol_segment)
        {
            super(leftIToken, rightIToken)

            this._eol_segment = _eol_segment;
            (<ASTNode> _eol_segment).setParent(this);
            this.initialize();
        }

        /**
         * A list of all children of this node, don't including the null ones.
         */
         public   getAllChildren() : Lpg.Util.ArrayList<IAst>
        {
            let list = new Lpg.Util.ArrayList<IAst>();
            if(this._eol_segment)  list.add(this._eol_segment);
            return list;
        }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            let checkChildren = v.visitEolSeg(this);
            if (checkChildren)
                this._eol_segment.accept(v);
            v.endVisitEolSeg(this);
        }
    }

    /**
     *<b>
    *<li>Rule 9:  LPG_item ::= ERROR_KEY$ error_segment END_KEY_OPT$
     *</b>
     */
    export class ErrorSeg extends ASTNode implements ILPG_item
    {
        private  _error_segment : Ierror_segment;

        public  geterror_segment() : Ierror_segment{ return this._error_segment; }
        public  seterror_segment( _error_segment : Ierror_segment) : void { this._error_segment = _error_segment; }

        constructor(leftIToken : IToken , rightIToken : IToken ,
                     _error_segment : Ierror_segment)
        {
            super(leftIToken, rightIToken)

            this._error_segment = _error_segment;
            (<ASTNode> _error_segment).setParent(this);
            this.initialize();
        }

        /**
         * A list of all children of this node, don't including the null ones.
         */
         public   getAllChildren() : Lpg.Util.ArrayList<IAst>
        {
            let list = new Lpg.Util.ArrayList<IAst>();
            if(this._error_segment)  list.add(this._error_segment);
            return list;
        }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            let checkChildren = v.visitErrorSeg(this);
            if (checkChildren)
                this._error_segment.accept(v);
            v.endVisitErrorSeg(this);
        }
    }

    /**
     *<b>
    *<li>Rule 10:  LPG_item ::= EXPORT_KEY$ export_segment END_KEY_OPT$
     *</b>
     */
    export class ExportSeg extends ASTNode implements ILPG_item
    {
        private  _export_segment : terminal_symbolList;

        public  getexport_segment() : terminal_symbolList{ return this._export_segment; }
        public  setexport_segment( _export_segment : terminal_symbolList) : void { this._export_segment = _export_segment; }

        constructor(leftIToken : IToken , rightIToken : IToken ,
                     _export_segment : terminal_symbolList)
        {
            super(leftIToken, rightIToken)

            this._export_segment = _export_segment;
            (<ASTNode> _export_segment).setParent(this);
            this.initialize();
        }

        /**
         * A list of all children of this node, don't including the null ones.
         */
         public   getAllChildren() : Lpg.Util.ArrayList<IAst>
        {
            let list = new Lpg.Util.ArrayList<IAst>();
            if(this._export_segment)  list.add(this._export_segment);
            return list;
        }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            let checkChildren = v.visitExportSeg(this);
            if (checkChildren)
                this._export_segment.accept(v);
            v.endVisitExportSeg(this);
        }
    }

    /**
     *<b>
    *<li>Rule 11:  LPG_item ::= GLOBALS_KEY$ globals_segment END_KEY_OPT$
     *</b>
     */
    export class GlobalsSeg extends ASTNode implements ILPG_item
    {
        private  _globals_segment : action_segmentList;

        public  getglobals_segment() : action_segmentList{ return this._globals_segment; }
        public  setglobals_segment( _globals_segment : action_segmentList) : void { this._globals_segment = _globals_segment; }

        constructor(leftIToken : IToken , rightIToken : IToken ,
                     _globals_segment : action_segmentList)
        {
            super(leftIToken, rightIToken)

            this._globals_segment = _globals_segment;
            (<ASTNode> _globals_segment).setParent(this);
            this.initialize();
        }

        /**
         * A list of all children of this node, don't including the null ones.
         */
         public   getAllChildren() : Lpg.Util.ArrayList<IAst>
        {
            let list = new Lpg.Util.ArrayList<IAst>();
            if(this._globals_segment)  list.add(this._globals_segment);
            return list;
        }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            let checkChildren = v.visitGlobalsSeg(this);
            if (checkChildren)
                this._globals_segment.accept(v);
            v.endVisitGlobalsSeg(this);
        }
    }

    /**
     *<b>
    *<li>Rule 12:  LPG_item ::= HEADERS_KEY$ headers_segment END_KEY_OPT$
     *</b>
     */
    export class HeadersSeg extends ASTNode implements ILPG_item
    {
        private  _headers_segment : action_segmentList;

        public  getheaders_segment() : action_segmentList{ return this._headers_segment; }
        public  setheaders_segment( _headers_segment : action_segmentList) : void { this._headers_segment = _headers_segment; }

        constructor(leftIToken : IToken , rightIToken : IToken ,
                     _headers_segment : action_segmentList)
        {
            super(leftIToken, rightIToken)

            this._headers_segment = _headers_segment;
            (<ASTNode> _headers_segment).setParent(this);
            this.initialize();
        }

        /**
         * A list of all children of this node, don't including the null ones.
         */
         public   getAllChildren() : Lpg.Util.ArrayList<IAst>
        {
            let list = new Lpg.Util.ArrayList<IAst>();
            if(this._headers_segment)  list.add(this._headers_segment);
            return list;
        }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            let checkChildren = v.visitHeadersSeg(this);
            if (checkChildren)
                this._headers_segment.accept(v);
            v.endVisitHeadersSeg(this);
        }
    }

    /**
     *<b>
    *<li>Rule 13:  LPG_item ::= IDENTIFIER_KEY$ identifier_segment END_KEY_OPT$
     *</b>
     */
    export class IdentifierSeg extends ASTNode implements ILPG_item
    {
        private  _identifier_segment : Iidentifier_segment;

        public  getidentifier_segment() : Iidentifier_segment{ return this._identifier_segment; }
        public  setidentifier_segment( _identifier_segment : Iidentifier_segment) : void { this._identifier_segment = _identifier_segment; }

        constructor(leftIToken : IToken , rightIToken : IToken ,
                     _identifier_segment : Iidentifier_segment)
        {
            super(leftIToken, rightIToken)

            this._identifier_segment = _identifier_segment;
            (<ASTNode> _identifier_segment).setParent(this);
            this.initialize();
        }

        /**
         * A list of all children of this node, don't including the null ones.
         */
         public   getAllChildren() : Lpg.Util.ArrayList<IAst>
        {
            let list = new Lpg.Util.ArrayList<IAst>();
            if(this._identifier_segment)  list.add(this._identifier_segment);
            return list;
        }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            let checkChildren = v.visitIdentifierSeg(this);
            if (checkChildren)
                this._identifier_segment.accept(v);
            v.endVisitIdentifierSeg(this);
        }
    }

    /**
     *<b>
    *<li>Rule 14:  LPG_item ::= IMPORT_KEY$ import_segment END_KEY_OPT$
     *</b>
     */
    export class ImportSeg extends ASTNode implements ILPG_item
    {
        private  _import_segment : import_segment;

        public  getimport_segment() : import_segment{ return this._import_segment; }
        public  setimport_segment( _import_segment : import_segment) : void { this._import_segment = _import_segment; }

        constructor(leftIToken : IToken , rightIToken : IToken ,
                     _import_segment : import_segment)
        {
            super(leftIToken, rightIToken)

            this._import_segment = _import_segment;
            (<ASTNode> _import_segment).setParent(this);
            this.initialize();
        }

        /**
         * A list of all children of this node, don't including the null ones.
         */
         public   getAllChildren() : Lpg.Util.ArrayList<IAst>
        {
            let list = new Lpg.Util.ArrayList<IAst>();
            if(this._import_segment)  list.add(this._import_segment);
            return list;
        }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            let checkChildren = v.visitImportSeg(this);
            if (checkChildren)
                this._import_segment.accept(v);
            v.endVisitImportSeg(this);
        }
    }

    /**
     *<b>
    *<li>Rule 15:  LPG_item ::= INCLUDE_KEY$ include_segment END_KEY_OPT$
     *</b>
     */
    export class IncludeSeg extends ASTNode implements ILPG_item
    {
        private  _include_segment : include_segment;

        public  getinclude_segment() : include_segment{ return this._include_segment; }
        public  setinclude_segment( _include_segment : include_segment) : void { this._include_segment = _include_segment; }

        constructor(leftIToken : IToken , rightIToken : IToken ,
                     _include_segment : include_segment)
        {
            super(leftIToken, rightIToken)

            this._include_segment = _include_segment;
            (<ASTNode> _include_segment).setParent(this);
            this.initialize();
        }

        /**
         * A list of all children of this node, don't including the null ones.
         */
         public   getAllChildren() : Lpg.Util.ArrayList<IAst>
        {
            let list = new Lpg.Util.ArrayList<IAst>();
            if(this._include_segment)  list.add(this._include_segment);
            return list;
        }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            let checkChildren = v.visitIncludeSeg(this);
            if (checkChildren)
                this._include_segment.accept(v);
            v.endVisitIncludeSeg(this);
        }
    }

    /**
     *<b>
    *<li>Rule 16:  LPG_item ::= KEYWORDS_KEY$ keywords_segment END_KEY_OPT$
     *</b>
     */
    export class KeywordsSeg extends ASTNode implements ILPG_item
    {
        private  _keywords_segment : keywordSpecList;

        public  getkeywords_segment() : keywordSpecList{ return this._keywords_segment; }
        public  setkeywords_segment( _keywords_segment : keywordSpecList) : void { this._keywords_segment = _keywords_segment; }

        constructor(leftIToken : IToken , rightIToken : IToken ,
                     _keywords_segment : keywordSpecList)
        {
            super(leftIToken, rightIToken)

            this._keywords_segment = _keywords_segment;
            (<ASTNode> _keywords_segment).setParent(this);
            this.initialize();
        }

        /**
         * A list of all children of this node, don't including the null ones.
         */
         public   getAllChildren() : Lpg.Util.ArrayList<IAst>
        {
            let list = new Lpg.Util.ArrayList<IAst>();
            if(this._keywords_segment)  list.add(this._keywords_segment);
            return list;
        }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            let checkChildren = v.visitKeywordsSeg(this);
            if (checkChildren)
                this._keywords_segment.accept(v);
            v.endVisitKeywordsSeg(this);
        }
    }

    /**
     *<b>
    *<li>Rule 17:  LPG_item ::= NAMES_KEY$ names_segment END_KEY_OPT$
     *</b>
     */
    export class NamesSeg extends ASTNode implements ILPG_item
    {
        private  _names_segment : nameSpecList;

        public  getnames_segment() : nameSpecList{ return this._names_segment; }
        public  setnames_segment( _names_segment : nameSpecList) : void { this._names_segment = _names_segment; }

        constructor(leftIToken : IToken , rightIToken : IToken ,
                     _names_segment : nameSpecList)
        {
            super(leftIToken, rightIToken)

            this._names_segment = _names_segment;
            (<ASTNode> _names_segment).setParent(this);
            this.initialize();
        }

        /**
         * A list of all children of this node, don't including the null ones.
         */
         public   getAllChildren() : Lpg.Util.ArrayList<IAst>
        {
            let list = new Lpg.Util.ArrayList<IAst>();
            if(this._names_segment)  list.add(this._names_segment);
            return list;
        }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            let checkChildren = v.visitNamesSeg(this);
            if (checkChildren)
                this._names_segment.accept(v);
            v.endVisitNamesSeg(this);
        }
    }

    /**
     *<b>
    *<li>Rule 18:  LPG_item ::= NOTICE_KEY$ notice_segment END_KEY_OPT$
     *</b>
     */
    export class NoticeSeg extends ASTNode implements ILPG_item
    {
        private  _notice_segment : action_segmentList;

        public  getnotice_segment() : action_segmentList{ return this._notice_segment; }
        public  setnotice_segment( _notice_segment : action_segmentList) : void { this._notice_segment = _notice_segment; }

        constructor(leftIToken : IToken , rightIToken : IToken ,
                     _notice_segment : action_segmentList)
        {
            super(leftIToken, rightIToken)

            this._notice_segment = _notice_segment;
            (<ASTNode> _notice_segment).setParent(this);
            this.initialize();
        }

        /**
         * A list of all children of this node, don't including the null ones.
         */
         public   getAllChildren() : Lpg.Util.ArrayList<IAst>
        {
            let list = new Lpg.Util.ArrayList<IAst>();
            if(this._notice_segment)  list.add(this._notice_segment);
            return list;
        }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            let checkChildren = v.visitNoticeSeg(this);
            if (checkChildren)
                this._notice_segment.accept(v);
            v.endVisitNoticeSeg(this);
        }
    }

    /**
     *<b>
    *<li>Rule 19:  LPG_item ::= RULES_KEY$ rules_segment END_KEY_OPT$
     *</b>
     */
    export class RulesSeg extends ASTNode implements ILPG_item
    {
        private  _rules_segment : rules_segment;

        public  getrules_segment() : rules_segment{ return this._rules_segment; }
        public  setrules_segment( _rules_segment : rules_segment) : void { this._rules_segment = _rules_segment; }

        constructor(leftIToken : IToken , rightIToken : IToken ,
                     _rules_segment : rules_segment)
        {
            super(leftIToken, rightIToken)

            this._rules_segment = _rules_segment;
            (<ASTNode> _rules_segment).setParent(this);
            this.initialize();
        }

        /**
         * A list of all children of this node, don't including the null ones.
         */
         public   getAllChildren() : Lpg.Util.ArrayList<IAst>
        {
            let list = new Lpg.Util.ArrayList<IAst>();
            if(this._rules_segment)  list.add(this._rules_segment);
            return list;
        }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            let checkChildren = v.visitRulesSeg(this);
            if (checkChildren)
                this._rules_segment.accept(v);
            v.endVisitRulesSeg(this);
        }
    }

    /**
     *<b>
    *<li>Rule 20:  LPG_item ::= SOFT_KEYWORDS_KEY$ keywords_segment END_KEY_OPT$
     *</b>
     */
    export class SoftKeywordsSeg extends ASTNode implements ILPG_item
    {
        private  _keywords_segment : keywordSpecList;

        public  getkeywords_segment() : keywordSpecList{ return this._keywords_segment; }
        public  setkeywords_segment( _keywords_segment : keywordSpecList) : void { this._keywords_segment = _keywords_segment; }

        constructor(leftIToken : IToken , rightIToken : IToken ,
                     _keywords_segment : keywordSpecList)
        {
            super(leftIToken, rightIToken)

            this._keywords_segment = _keywords_segment;
            (<ASTNode> _keywords_segment).setParent(this);
            this.initialize();
        }

        /**
         * A list of all children of this node, don't including the null ones.
         */
         public   getAllChildren() : Lpg.Util.ArrayList<IAst>
        {
            let list = new Lpg.Util.ArrayList<IAst>();
            if(this._keywords_segment)  list.add(this._keywords_segment);
            return list;
        }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            let checkChildren = v.visitSoftKeywordsSeg(this);
            if (checkChildren)
                this._keywords_segment.accept(v);
            v.endVisitSoftKeywordsSeg(this);
        }
    }

    /**
     *<b>
    *<li>Rule 21:  LPG_item ::= START_KEY$ start_segment END_KEY_OPT$
     *</b>
     */
    export class StartSeg extends ASTNode implements ILPG_item
    {
        private  _start_segment : start_symbolList;

        public  getstart_segment() : start_symbolList{ return this._start_segment; }
        public  setstart_segment( _start_segment : start_symbolList) : void { this._start_segment = _start_segment; }

        constructor(leftIToken : IToken , rightIToken : IToken ,
                     _start_segment : start_symbolList)
        {
            super(leftIToken, rightIToken)

            this._start_segment = _start_segment;
            (<ASTNode> _start_segment).setParent(this);
            this.initialize();
        }

        /**
         * A list of all children of this node, don't including the null ones.
         */
         public   getAllChildren() : Lpg.Util.ArrayList<IAst>
        {
            let list = new Lpg.Util.ArrayList<IAst>();
            if(this._start_segment)  list.add(this._start_segment);
            return list;
        }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            let checkChildren = v.visitStartSeg(this);
            if (checkChildren)
                this._start_segment.accept(v);
            v.endVisitStartSeg(this);
        }
    }

    /**
     *<b>
    *<li>Rule 22:  LPG_item ::= TERMINALS_KEY$ terminals_segment END_KEY_OPT$
     *</b>
     */
    export class TerminalsSeg extends ASTNode implements ILPG_item
    {
        private  _terminals_segment : terminals_segment_terminalList;

        public  getterminals_segment() : terminals_segment_terminalList{ return this._terminals_segment; }
        public  setterminals_segment( _terminals_segment : terminals_segment_terminalList) : void { this._terminals_segment = _terminals_segment; }

        constructor(leftIToken : IToken , rightIToken : IToken ,
                     _terminals_segment : terminals_segment_terminalList)
        {
            super(leftIToken, rightIToken)

            this._terminals_segment = _terminals_segment;
            (<ASTNode> _terminals_segment).setParent(this);
            this.initialize();
        }

        /**
         * A list of all children of this node, don't including the null ones.
         */
         public   getAllChildren() : Lpg.Util.ArrayList<IAst>
        {
            let list = new Lpg.Util.ArrayList<IAst>();
            if(this._terminals_segment)  list.add(this._terminals_segment);
            return list;
        }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            let checkChildren = v.visitTerminalsSeg(this);
            if (checkChildren)
                this._terminals_segment.accept(v);
            v.endVisitTerminalsSeg(this);
        }
    }

    /**
     *<b>
    *<li>Rule 23:  LPG_item ::= TRAILERS_KEY$ trailers_segment END_KEY_OPT$
     *</b>
     */
    export class TrailersSeg extends ASTNode implements ILPG_item
    {
        private  _trailers_segment : action_segmentList;

        public  gettrailers_segment() : action_segmentList{ return this._trailers_segment; }
        public  settrailers_segment( _trailers_segment : action_segmentList) : void { this._trailers_segment = _trailers_segment; }

        constructor(leftIToken : IToken , rightIToken : IToken ,
                     _trailers_segment : action_segmentList)
        {
            super(leftIToken, rightIToken)

            this._trailers_segment = _trailers_segment;
            (<ASTNode> _trailers_segment).setParent(this);
            this.initialize();
        }

        /**
         * A list of all children of this node, don't including the null ones.
         */
         public   getAllChildren() : Lpg.Util.ArrayList<IAst>
        {
            let list = new Lpg.Util.ArrayList<IAst>();
            if(this._trailers_segment)  list.add(this._trailers_segment);
            return list;
        }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            let checkChildren = v.visitTrailersSeg(this);
            if (checkChildren)
                this._trailers_segment.accept(v);
            v.endVisitTrailersSeg(this);
        }
    }

    /**
     *<b>
    *<li>Rule 24:  LPG_item ::= TYPES_KEY$ types_segment END_KEY_OPT$
     *</b>
     */
    export class TypesSeg extends ASTNode implements ILPG_item
    {
        private  _types_segment : type_declarationsList;

        public  gettypes_segment() : type_declarationsList{ return this._types_segment; }
        public  settypes_segment( _types_segment : type_declarationsList) : void { this._types_segment = _types_segment; }

        constructor(leftIToken : IToken , rightIToken : IToken ,
                     _types_segment : type_declarationsList)
        {
            super(leftIToken, rightIToken)

            this._types_segment = _types_segment;
            (<ASTNode> _types_segment).setParent(this);
            this.initialize();
        }

        /**
         * A list of all children of this node, don't including the null ones.
         */
         public   getAllChildren() : Lpg.Util.ArrayList<IAst>
        {
            let list = new Lpg.Util.ArrayList<IAst>();
            if(this._types_segment)  list.add(this._types_segment);
            return list;
        }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            let checkChildren = v.visitTypesSeg(this);
            if (checkChildren)
                this._types_segment.accept(v);
            v.endVisitTypesSeg(this);
        }
    }

    /**
     *<b>
    *<li>Rule 25:  LPG_item ::= RECOVER_KEY$ recover_segment END_KEY_OPT$
     *</b>
     */
    export class RecoverSeg extends ASTNode implements ILPG_item
    {
        private  _recover_segment : SYMBOLList;

        public  getrecover_segment() : SYMBOLList{ return this._recover_segment; }
        public  setrecover_segment( _recover_segment : SYMBOLList) : void { this._recover_segment = _recover_segment; }

        constructor(leftIToken : IToken , rightIToken : IToken ,
                     _recover_segment : SYMBOLList)
        {
            super(leftIToken, rightIToken)

            this._recover_segment = _recover_segment;
            (<ASTNode> _recover_segment).setParent(this);
            this.initialize();
        }

        /**
         * A list of all children of this node, don't including the null ones.
         */
         public   getAllChildren() : Lpg.Util.ArrayList<IAst>
        {
            let list = new Lpg.Util.ArrayList<IAst>();
            if(this._recover_segment)  list.add(this._recover_segment);
            return list;
        }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            let checkChildren = v.visitRecoverSeg(this);
            if (checkChildren)
                this._recover_segment.accept(v);
            v.endVisitRecoverSeg(this);
        }
    }

    /**
     *<b>
    *<li>Rule 26:  LPG_item ::= DISJOINTPREDECESSORSETS_KEY$ predecessor_segment END_KEY_OPT$
     *</b>
     */
    export class PredecessorSeg extends ASTNode implements ILPG_item
    {
        private  _predecessor_segment : symbol_pairList;

        public  getpredecessor_segment() : symbol_pairList{ return this._predecessor_segment; }
        public  setpredecessor_segment( _predecessor_segment : symbol_pairList) : void { this._predecessor_segment = _predecessor_segment; }

        constructor(leftIToken : IToken , rightIToken : IToken ,
                     _predecessor_segment : symbol_pairList)
        {
            super(leftIToken, rightIToken)

            this._predecessor_segment = _predecessor_segment;
            (<ASTNode> _predecessor_segment).setParent(this);
            this.initialize();
        }

        /**
         * A list of all children of this node, don't including the null ones.
         */
         public   getAllChildren() : Lpg.Util.ArrayList<IAst>
        {
            let list = new Lpg.Util.ArrayList<IAst>();
            if(this._predecessor_segment)  list.add(this._predecessor_segment);
            return list;
        }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            let checkChildren = v.visitPredecessorSeg(this);
            if (checkChildren)
                this._predecessor_segment.accept(v);
            v.endVisitPredecessorSeg(this);
        }
    }

    /**
     *<b>
    *<li>Rule 27:  options_segment ::= %Empty
    *<li>Rule 28:  options_segment ::= options_segment option_spec
     *</b>
     */
    export class option_specList extends AbstractASTNodeList implements Ioptions_segment
    {
        public  getoption_specAt(i : number) : option_spec{ return <option_spec> this.getElementAt(i); }

        constructor(leftToken : IToken, rightToken : IToken , leftRecursive : boolean )
        {
            super(leftToken, rightToken, leftRecursive);
        }

       public static option_specListfromElement(element : option_spec,leftRecursive : boolean) : option_specList
        {
            let obj = new option_specList(element.getLeftIToken(),element.getRightIToken(), leftRecursive);
            obj.list.add(element);
            (<ASTNode> element).setParent(obj);
            return obj;
        }

        public  addElement( _option_spec : option_spec) : void
        {
            super.addElement(<ASTNode> _option_spec);
            (<ASTNode> _option_spec).setParent(this);
        }


        public  accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }
        public enter(v : Visitor) : void
        {
            let checkChildren = v.visitoption_specList(this);
            if (checkChildren)
            {
                for (let i = 0; i < this.size(); i++)
                {
                     let element = this.getoption_specAt(i);
                    if (! v.preVisit(element)) continue;
                    element.enter(v);
                    v.postVisit(element);
                }
            }
            v.endVisitoption_specList(this);
        }
    }

    /**
     *<b>
    *<li>Rule 29:  option_spec ::= OPTIONS_KEY$ option_list
     *</b>
     */
    export class option_spec extends ASTNode implements Ioption_spec
    {
        private  _option_list : optionList;

        public  getoption_list() : optionList{ return this._option_list; }
        public  setoption_list( _option_list : optionList) : void { this._option_list = _option_list; }

        constructor(leftIToken : IToken , rightIToken : IToken ,
                     _option_list : optionList)
        {
            super(leftIToken, rightIToken)

            this._option_list = _option_list;
            (<ASTNode> _option_list).setParent(this);
            this.initialize();
        }

        /**
         * A list of all children of this node, don't including the null ones.
         */
         public   getAllChildren() : Lpg.Util.ArrayList<IAst>
        {
            let list = new Lpg.Util.ArrayList<IAst>();
            if(this._option_list)  list.add(this._option_list);
            return list;
        }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            let checkChildren = v.visitoption_spec(this);
            if (checkChildren)
                this._option_list.accept(v);
            v.endVisitoption_spec(this);
        }
    }

    /**
     *<b>
    *<li>Rule 30:  option_list ::= option
    *<li>Rule 31:  option_list ::= option_list ,$ option
     *</b>
     */
    export class optionList extends AbstractASTNodeList implements Ioption_list
    {
        public  getoptionAt(i : number) : option{ return <option> this.getElementAt(i); }

        constructor(leftToken : IToken, rightToken : IToken , leftRecursive : boolean )
        {
            super(leftToken, rightToken, leftRecursive);
        }

       public static optionListfromElement(element : option,leftRecursive : boolean) : optionList
        {
            let obj = new optionList(element.getLeftIToken(),element.getRightIToken(), leftRecursive);
            obj.list.add(element);
            (<ASTNode> element).setParent(obj);
            return obj;
        }

        public  addElement( _option : option) : void
        {
            super.addElement(<ASTNode> _option);
            (<ASTNode> _option).setParent(this);
        }


        public  accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }
        public enter(v : Visitor) : void
        {
            let checkChildren = v.visitoptionList(this);
            if (checkChildren)
            {
                for (let i = 0; i < this.size(); i++)
                {
                     let element = this.getoptionAt(i);
                    if (! v.preVisit(element)) continue;
                    element.enter(v);
                    v.postVisit(element);
                }
            }
            v.endVisitoptionList(this);
        }
    }

    /**
     *<b>
    *<li>Rule 32:  option ::= SYMBOL option_value
     *</b>
     */
    export class option extends ASTNode implements Ioption
    {
        private  _SYMBOL : ASTNodeToken;
        private  _option_value : Ioption_value| null;

        public  getSYMBOL() : ASTNodeToken{ return this._SYMBOL; }
        public  setSYMBOL( _SYMBOL : ASTNodeToken) : void { this._SYMBOL = _SYMBOL; }
        /**
         * The value returned by <b>getoption_value</b> may be <b>null</b>
         */
        public  getoption_value() : Ioption_value | null { return this._option_value; }
        public  setoption_value( _option_value : Ioption_value) : void { this._option_value = _option_value; }

        constructor(leftIToken : IToken , rightIToken : IToken ,
                     _SYMBOL : ASTNodeToken,
                     _option_value : Ioption_value| null)
        {
            super(leftIToken, rightIToken)

            this._SYMBOL = _SYMBOL;
            (<ASTNode> _SYMBOL).setParent(this);
            this._option_value = _option_value;
            if (_option_value) (<ASTNode> _option_value).setParent(this);
            this.initialize();
        }

        /**
         * A list of all children of this node, don't including the null ones.
         */
         public   getAllChildren() : Lpg.Util.ArrayList<IAst>
        {
            let list = new Lpg.Util.ArrayList<IAst>();
            if(this._SYMBOL)  list.add(this._SYMBOL);
            if(this._option_value)  list.add(this._option_value);
            return list;
        }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            let checkChildren = v.visitoption(this);
            if (checkChildren)
            {
                this._SYMBOL.accept(v);
                if (this._option_value) this._option_value.accept(v);
            }
            v.endVisitoption(this);
        }
    }

    /**
     *<b>
    *<li>Rule 36:  symbol_list ::= SYMBOL
    *<li>Rule 37:  symbol_list ::= symbol_list ,$ SYMBOL
    *<li>Rule 75:  drop_symbols ::= SYMBOL
    *<li>Rule 76:  drop_symbols ::= drop_symbols SYMBOL
    *<li>Rule 136:  barSymbolList ::= SYMBOL
    *<li>Rule 137:  barSymbolList ::= barSymbolList |$ SYMBOL
    *<li>Rule 141:  recover_segment ::= %Empty
    *<li>Rule 142:  recover_segment ::= recover_segment recover_symbol
     *</b>
     */
    export class SYMBOLList extends AbstractASTNodeList implements Isymbol_list, Idrop_symbols, IbarSymbolList, Irecover_segment
    {
        public  getSYMBOLAt(i : number) : ASTNodeToken{ return <ASTNodeToken> this.getElementAt(i); }

        constructor(leftToken : IToken, rightToken : IToken , leftRecursive : boolean )
        {
            super(leftToken, rightToken, leftRecursive);
        }

       public static SYMBOLListfromElement(element : ASTNodeToken,leftRecursive : boolean) : SYMBOLList
        {
            let obj = new SYMBOLList(element.getLeftIToken(),element.getRightIToken(), leftRecursive);
            obj.list.add(element);
            (<ASTNode> element).setParent(obj);
            return obj;
        }

        public  addElement( _SYMBOL : ASTNodeToken) : void
        {
            super.addElement(<ASTNode> _SYMBOL);
            (<ASTNode> _SYMBOL).setParent(this);
        }


        public  accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }
        public enter(v : Visitor) : void
        {
            let checkChildren = v.visitSYMBOLList(this);
            if (checkChildren)
            {
                for (let i = 0; i < this.size(); i++)
                {
                     let element = this.getSYMBOLAt(i);
                    if (! v.preVisit(element)) continue;
                    element.enter(v);
                    v.postVisit(element);
                }
            }
            v.endVisitSYMBOLList(this);
        }
    }

    /**
     *<b>
    *<li>Rule 38:  alias_segment ::= aliasSpec
    *<li>Rule 39:  alias_segment ::= alias_segment aliasSpec
     *</b>
     */
    export class aliasSpecList extends AbstractASTNodeList implements Ialias_segment
    {
        public  getaliasSpecAt(i : number) : IaliasSpec{ return <IaliasSpec> this.getElementAt(i); }

        constructor(leftToken : IToken, rightToken : IToken , leftRecursive : boolean )
        {
            super(leftToken, rightToken, leftRecursive);
        }

       public static aliasSpecListfromElement(element : IaliasSpec,leftRecursive : boolean) : aliasSpecList
        {
            let obj = new aliasSpecList(element.getLeftIToken(),element.getRightIToken(), leftRecursive);
            obj.list.add(element);
            (<ASTNode> element).setParent(obj);
            return obj;
        }

        public  addElement( _aliasSpec : IaliasSpec) : void
        {
            super.addElement(<ASTNode> _aliasSpec);
            (<ASTNode> _aliasSpec).setParent(this);
        }


        public  accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }
        public enter(v : Visitor) : void
        {
            let checkChildren = v.visitaliasSpecList(this);
            if (checkChildren)
            {
                for (let i = 0; i < this.size(); i++)
                {
                    let element = this.getaliasSpecAt(i);
                    element.accept(v);
                }
            }
            v.endVisitaliasSpecList(this);
        }
    }

    /**
     *<b>
    *<li>Rule 46:  alias_lhs_macro_name ::= MACRO_NAME
     *</b>
     */
    export class alias_lhs_macro_name extends ASTNodeToken implements Ialias_lhs_macro_name
    {
        public  getMACRO_NAME() : IToken { return this.leftIToken; }

    constructor(token : IToken ) { super(token); this.initialize(); }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            v.visitalias_lhs_macro_name(this);
            v.endVisitalias_lhs_macro_name(this);
        }
    }

    /**
     *<b>
    *<li>Rule 55:  define_segment ::= defineSpec
    *<li>Rule 56:  define_segment ::= define_segment defineSpec
     *</b>
     */
    export class defineSpecList extends AbstractASTNodeList implements Idefine_segment
    {
        public  getdefineSpecAt(i : number) : defineSpec{ return <defineSpec> this.getElementAt(i); }

        constructor(leftToken : IToken, rightToken : IToken , leftRecursive : boolean )
        {
            super(leftToken, rightToken, leftRecursive);
        }

       public static defineSpecListfromElement(element : defineSpec,leftRecursive : boolean) : defineSpecList
        {
            let obj = new defineSpecList(element.getLeftIToken(),element.getRightIToken(), leftRecursive);
            obj.list.add(element);
            (<ASTNode> element).setParent(obj);
            return obj;
        }

        public  addElement( _defineSpec : defineSpec) : void
        {
            super.addElement(<ASTNode> _defineSpec);
            (<ASTNode> _defineSpec).setParent(this);
        }


        public  accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }
        public enter(v : Visitor) : void
        {
            let checkChildren = v.visitdefineSpecList(this);
            if (checkChildren)
            {
                for (let i = 0; i < this.size(); i++)
                {
                     let element = this.getdefineSpecAt(i);
                    if (! v.preVisit(element)) continue;
                    element.enter(v);
                    v.postVisit(element);
                }
            }
            v.endVisitdefineSpecList(this);
        }
    }

    /**
     *<b>
    *<li>Rule 57:  defineSpec ::= macro_name_symbol macro_segment
     *</b>
     */
    export class defineSpec extends ASTNode implements IdefineSpec
    {
        private  _macro_name_symbol : Imacro_name_symbol;
        private  _macro_segment : macro_segment;

        public  getmacro_name_symbol() : Imacro_name_symbol{ return this._macro_name_symbol; }
        public  setmacro_name_symbol( _macro_name_symbol : Imacro_name_symbol) : void { this._macro_name_symbol = _macro_name_symbol; }
        public  getmacro_segment() : macro_segment{ return this._macro_segment; }
        public  setmacro_segment( _macro_segment : macro_segment) : void { this._macro_segment = _macro_segment; }

        constructor(leftIToken : IToken , rightIToken : IToken ,
                     _macro_name_symbol : Imacro_name_symbol,
                     _macro_segment : macro_segment)
        {
            super(leftIToken, rightIToken)

            this._macro_name_symbol = _macro_name_symbol;
            (<ASTNode> _macro_name_symbol).setParent(this);
            this._macro_segment = _macro_segment;
            (<ASTNode> _macro_segment).setParent(this);
            this.initialize();
        }

        /**
         * A list of all children of this node, don't including the null ones.
         */
         public   getAllChildren() : Lpg.Util.ArrayList<IAst>
        {
            let list = new Lpg.Util.ArrayList<IAst>();
            if(this._macro_name_symbol)  list.add(this._macro_name_symbol);
            if(this._macro_segment)  list.add(this._macro_segment);
            return list;
        }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            let checkChildren = v.visitdefineSpec(this);
            if (checkChildren)
            {
                this._macro_name_symbol.accept(v);
                this._macro_segment.accept(v);
            }
            v.endVisitdefineSpec(this);
        }
    }

    /**
     *<b>
    *<li>Rule 60:  macro_segment ::= BLOCK
     *</b>
     */
    export class macro_segment extends ASTNodeToken implements Imacro_segment
    {
        public  getBLOCK() : IToken { return this.leftIToken; }

    constructor(token : IToken ) { super(token); this.initialize(); }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            v.visitmacro_segment(this);
            v.endVisitmacro_segment(this);
        }
    }

    /**
     *<b>
    *<li>Rule 64:  export_segment ::= terminal_symbol
    *<li>Rule 65:  export_segment ::= export_segment terminal_symbol
     *</b>
     */
    export class terminal_symbolList extends AbstractASTNodeList implements Iexport_segment
    {
        public  getterminal_symbolAt(i : number) : Iterminal_symbol{ return <Iterminal_symbol> this.getElementAt(i); }

        constructor(leftToken : IToken, rightToken : IToken , leftRecursive : boolean )
        {
            super(leftToken, rightToken, leftRecursive);
        }

       public static terminal_symbolListfromElement(element : Iterminal_symbol,leftRecursive : boolean) : terminal_symbolList
        {
            let obj = new terminal_symbolList(element.getLeftIToken(),element.getRightIToken(), leftRecursive);
            obj.list.add(element);
            (<ASTNode> element).setParent(obj);
            return obj;
        }

        public  addElement( _terminal_symbol : Iterminal_symbol) : void
        {
            super.addElement(<ASTNode> _terminal_symbol);
            (<ASTNode> _terminal_symbol).setParent(this);
        }


        public  accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }
        public enter(v : Visitor) : void
        {
            let checkChildren = v.visitterminal_symbolList(this);
            if (checkChildren)
            {
                for (let i = 0; i < this.size(); i++)
                {
                    let element = this.getterminal_symbolAt(i);
                    element.accept(v);
                }
            }
            v.endVisitterminal_symbolList(this);
        }
    }

    /**
     *<b>
    *<li>Rule 66:  globals_segment ::= action_segment
    *<li>Rule 67:  globals_segment ::= globals_segment action_segment
    *<li>Rule 96:  notice_segment ::= action_segment
    *<li>Rule 97:  notice_segment ::= notice_segment action_segment
    *<li>Rule 146:  action_segment_list ::= %Empty
    *<li>Rule 147:  action_segment_list ::= action_segment_list action_segment
     *</b>
     */
    export class action_segmentList extends AbstractASTNodeList implements Iglobals_segment, Inotice_segment, Iaction_segment_list
    {
        public  getaction_segmentAt(i : number) : action_segment{ return <action_segment> this.getElementAt(i); }

        constructor(leftToken : IToken, rightToken : IToken , leftRecursive : boolean )
        {
            super(leftToken, rightToken, leftRecursive);
        }

       public static action_segmentListfromElement(element : action_segment,leftRecursive : boolean) : action_segmentList
        {
            let obj = new action_segmentList(element.getLeftIToken(),element.getRightIToken(), leftRecursive);
            obj.list.add(element);
            (<ASTNode> element).setParent(obj);
            return obj;
        }

        public  addElement( _action_segment : action_segment) : void
        {
            super.addElement(<ASTNode> _action_segment);
            (<ASTNode> _action_segment).setParent(this);
        }


        public  accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }
        public enter(v : Visitor) : void
        {
            let checkChildren = v.visitaction_segmentList(this);
            if (checkChildren)
            {
                for (let i = 0; i < this.size(); i++)
                {
                     let element = this.getaction_segmentAt(i);
                    if (! v.preVisit(element)) continue;
                    element.enter(v);
                    v.postVisit(element);
                }
            }
            v.endVisitaction_segmentList(this);
        }
    }

    /**
     *<b>
    *<li>Rule 70:  import_segment ::= SYMBOL drop_command_list
     *</b>
     */
    export class import_segment extends ASTNode implements Iimport_segment
    {
        private  _SYMBOL : ASTNodeToken;
        private  _drop_command_list : drop_commandList;

        public  getSYMBOL() : ASTNodeToken{ return this._SYMBOL; }
        public  setSYMBOL( _SYMBOL : ASTNodeToken) : void { this._SYMBOL = _SYMBOL; }
        public  getdrop_command_list() : drop_commandList{ return this._drop_command_list; }
        public  setdrop_command_list( _drop_command_list : drop_commandList) : void { this._drop_command_list = _drop_command_list; }

        constructor(leftIToken : IToken , rightIToken : IToken ,
                     _SYMBOL : ASTNodeToken,
                     _drop_command_list : drop_commandList)
        {
            super(leftIToken, rightIToken)

            this._SYMBOL = _SYMBOL;
            (<ASTNode> _SYMBOL).setParent(this);
            this._drop_command_list = _drop_command_list;
            (<ASTNode> _drop_command_list).setParent(this);
            this.initialize();
        }

        /**
         * A list of all children of this node, don't including the null ones.
         */
         public   getAllChildren() : Lpg.Util.ArrayList<IAst>
        {
            let list = new Lpg.Util.ArrayList<IAst>();
            if(this._SYMBOL)  list.add(this._SYMBOL);
            if(this._drop_command_list)  list.add(this._drop_command_list);
            return list;
        }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            let checkChildren = v.visitimport_segment(this);
            if (checkChildren)
            {
                this._SYMBOL.accept(v);
                this._drop_command_list.accept(v);
            }
            v.endVisitimport_segment(this);
        }
    }

    /**
     *<b>
    *<li>Rule 71:  drop_command_list ::= %Empty
    *<li>Rule 72:  drop_command_list ::= drop_command_list drop_command
     *</b>
     */
    export class drop_commandList extends AbstractASTNodeList implements Idrop_command_list
    {
        public  getdrop_commandAt(i : number) : Idrop_command{ return <Idrop_command> this.getElementAt(i); }

        constructor(leftToken : IToken, rightToken : IToken , leftRecursive : boolean )
        {
            super(leftToken, rightToken, leftRecursive);
        }

       public static drop_commandListfromElement(element : Idrop_command,leftRecursive : boolean) : drop_commandList
        {
            let obj = new drop_commandList(element.getLeftIToken(),element.getRightIToken(), leftRecursive);
            obj.list.add(element);
            (<ASTNode> element).setParent(obj);
            return obj;
        }

        public  addElement( _drop_command : Idrop_command) : void
        {
            super.addElement(<ASTNode> _drop_command);
            (<ASTNode> _drop_command).setParent(this);
        }


        public  accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }
        public enter(v : Visitor) : void
        {
            let checkChildren = v.visitdrop_commandList(this);
            if (checkChildren)
            {
                for (let i = 0; i < this.size(); i++)
                {
                    let element = this.getdrop_commandAt(i);
                    element.accept(v);
                }
            }
            v.endVisitdrop_commandList(this);
        }
    }

    /**
     *<b>
    *<li>Rule 77:  drop_rules ::= drop_rule
    *<li>Rule 78:  drop_rules ::= drop_rules drop_rule
     *</b>
     */
    export class drop_ruleList extends AbstractASTNodeList implements Idrop_rules
    {
        public  getdrop_ruleAt(i : number) : drop_rule{ return <drop_rule> this.getElementAt(i); }

        constructor(leftToken : IToken, rightToken : IToken , leftRecursive : boolean )
        {
            super(leftToken, rightToken, leftRecursive);
        }

       public static drop_ruleListfromElement(element : drop_rule,leftRecursive : boolean) : drop_ruleList
        {
            let obj = new drop_ruleList(element.getLeftIToken(),element.getRightIToken(), leftRecursive);
            obj.list.add(element);
            (<ASTNode> element).setParent(obj);
            return obj;
        }

        public  addElement( _drop_rule : drop_rule) : void
        {
            super.addElement(<ASTNode> _drop_rule);
            (<ASTNode> _drop_rule).setParent(this);
        }


        public  accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }
        public enter(v : Visitor) : void
        {
            let checkChildren = v.visitdrop_ruleList(this);
            if (checkChildren)
            {
                for (let i = 0; i < this.size(); i++)
                {
                     let element = this.getdrop_ruleAt(i);
                    if (! v.preVisit(element)) continue;
                    element.enter(v);
                    v.postVisit(element);
                }
            }
            v.endVisitdrop_ruleList(this);
        }
    }

    /**
     *<b>
    *<li>Rule 79:  drop_rule ::= SYMBOL optMacroName produces ruleList
     *</b>
     */
    export class drop_rule extends ASTNode implements Idrop_rule
    {
        private  _SYMBOL : ASTNodeToken;
        private  _optMacroName : optMacroName| null;
        private  _produces : Iproduces;
        private  _ruleList : ruleList;

        public  getSYMBOL() : ASTNodeToken{ return this._SYMBOL; }
        public  setSYMBOL( _SYMBOL : ASTNodeToken) : void { this._SYMBOL = _SYMBOL; }
        /**
         * The value returned by <b>getoptMacroName</b> may be <b>null</b>
         */
        public  getoptMacroName() : optMacroName | null { return this._optMacroName; }
        public  setoptMacroName( _optMacroName : optMacroName) : void { this._optMacroName = _optMacroName; }
        public  getproduces() : Iproduces{ return this._produces; }
        public  setproduces( _produces : Iproduces) : void { this._produces = _produces; }
        public  getruleList() : ruleList{ return this._ruleList; }
        public  setruleList( _ruleList : ruleList) : void { this._ruleList = _ruleList; }

        constructor(leftIToken : IToken , rightIToken : IToken ,
                     _SYMBOL : ASTNodeToken,
                     _optMacroName : optMacroName| null,
                     _produces : Iproduces,
                     _ruleList : ruleList)
        {
            super(leftIToken, rightIToken)

            this._SYMBOL = _SYMBOL;
            (<ASTNode> _SYMBOL).setParent(this);
            this._optMacroName = _optMacroName;
            if (_optMacroName) (<ASTNode> _optMacroName).setParent(this);
            this._produces = _produces;
            (<ASTNode> _produces).setParent(this);
            this._ruleList = _ruleList;
            (<ASTNode> _ruleList).setParent(this);
            this.initialize();
        }

        /**
         * A list of all children of this node, don't including the null ones.
         */
         public   getAllChildren() : Lpg.Util.ArrayList<IAst>
        {
            let list = new Lpg.Util.ArrayList<IAst>();
            if(this._SYMBOL)  list.add(this._SYMBOL);
            if(this._optMacroName)  list.add(this._optMacroName);
            if(this._produces)  list.add(this._produces);
            if(this._ruleList)  list.add(this._ruleList);
            return list;
        }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            let checkChildren = v.visitdrop_rule(this);
            if (checkChildren)
            {
                this._SYMBOL.accept(v);
                if (this._optMacroName) this._optMacroName.accept(v);
                this._produces.accept(v);
                this._ruleList.accept(v);
            }
            v.endVisitdrop_rule(this);
        }
    }

    /**
     *<em>
    *<li>Rule 80:  optMacroName ::= %Empty
     *</em>
     *<p>
     *<b>
    *<li>Rule 81:  optMacroName ::= MACRO_NAME
     *</b>
     */
    export class optMacroName extends ASTNodeToken implements IoptMacroName
    {
        public  getMACRO_NAME() : IToken { return this.leftIToken; }

    constructor(token : IToken ) { super(token); this.initialize(); }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            v.visitoptMacroName(this);
            v.endVisitoptMacroName(this);
        }
    }

    /**
     *<b>
    *<li>Rule 82:  include_segment ::= SYMBOL
     *</b>
     */
    export class include_segment extends ASTNodeToken implements Iinclude_segment
    {
        public  getSYMBOL() : IToken { return this.leftIToken; }

    constructor(token : IToken ) { super(token); this.initialize(); }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            v.visitinclude_segment(this);
            v.endVisitinclude_segment(this);
        }
    }

    /**
     *<b>
    *<li>Rule 83:  keywords_segment ::= keywordSpec
    *<li>Rule 84:  keywords_segment ::= keywords_segment keywordSpec
     *</b>
     */
    export class keywordSpecList extends AbstractASTNodeList implements Ikeywords_segment
    {
        public  getkeywordSpecAt(i : number) : IkeywordSpec{ return <IkeywordSpec> this.getElementAt(i); }

        constructor(leftToken : IToken, rightToken : IToken , leftRecursive : boolean )
        {
            super(leftToken, rightToken, leftRecursive);
        }

       public static keywordSpecListfromElement(element : IkeywordSpec,leftRecursive : boolean) : keywordSpecList
        {
            let obj = new keywordSpecList(element.getLeftIToken(),element.getRightIToken(), leftRecursive);
            obj.list.add(element);
            (<ASTNode> element).setParent(obj);
            return obj;
        }

        public  addElement( _keywordSpec : IkeywordSpec) : void
        {
            super.addElement(<ASTNode> _keywordSpec);
            (<ASTNode> _keywordSpec).setParent(this);
        }


        public  accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }
        public enter(v : Visitor) : void
        {
            let checkChildren = v.visitkeywordSpecList(this);
            if (checkChildren)
            {
                for (let i = 0; i < this.size(); i++)
                {
                    let element = this.getkeywordSpecAt(i);
                    element.accept(v);
                }
            }
            v.endVisitkeywordSpecList(this);
        }
    }

    /**
     *<em>
    *<li>Rule 85:  keywordSpec ::= terminal_symbol
     *</em>
     *<p>
     *<b>
    *<li>Rule 86:  keywordSpec ::= terminal_symbol produces name
     *</b>
     */
    export class keywordSpec extends ASTNode implements IkeywordSpec
    {
        private  _terminal_symbol : Iterminal_symbol;
        private  _produces : Iproduces;
        private  _name : Iname;

        public  getterminal_symbol() : Iterminal_symbol{ return this._terminal_symbol; }
        public  setterminal_symbol( _terminal_symbol : Iterminal_symbol) : void { this._terminal_symbol = _terminal_symbol; }
        public  getproduces() : Iproduces{ return this._produces; }
        public  setproduces( _produces : Iproduces) : void { this._produces = _produces; }
        public  getname() : Iname{ return this._name; }
        public  setname( _name : Iname) : void { this._name = _name; }

        constructor(leftIToken : IToken , rightIToken : IToken ,
                     _terminal_symbol : Iterminal_symbol,
                     _produces : Iproduces,
                     _name : Iname)
        {
            super(leftIToken, rightIToken)

            this._terminal_symbol = _terminal_symbol;
            (<ASTNode> _terminal_symbol).setParent(this);
            this._produces = _produces;
            (<ASTNode> _produces).setParent(this);
            this._name = _name;
            (<ASTNode> _name).setParent(this);
            this.initialize();
        }

        /**
         * A list of all children of this node, don't including the null ones.
         */
         public   getAllChildren() : Lpg.Util.ArrayList<IAst>
        {
            let list = new Lpg.Util.ArrayList<IAst>();
            if(this._terminal_symbol)  list.add(this._terminal_symbol);
            if(this._produces)  list.add(this._produces);
            if(this._name)  list.add(this._name);
            return list;
        }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            let checkChildren = v.visitkeywordSpec(this);
            if (checkChildren)
            {
                this._terminal_symbol.accept(v);
                this._produces.accept(v);
                this._name.accept(v);
            }
            v.endVisitkeywordSpec(this);
        }
    }

    /**
     *<b>
    *<li>Rule 87:  names_segment ::= nameSpec
    *<li>Rule 88:  names_segment ::= names_segment nameSpec
     *</b>
     */
    export class nameSpecList extends AbstractASTNodeList implements Inames_segment
    {
        public  getnameSpecAt(i : number) : nameSpec{ return <nameSpec> this.getElementAt(i); }

        constructor(leftToken : IToken, rightToken : IToken , leftRecursive : boolean )
        {
            super(leftToken, rightToken, leftRecursive);
        }

       public static nameSpecListfromElement(element : nameSpec,leftRecursive : boolean) : nameSpecList
        {
            let obj = new nameSpecList(element.getLeftIToken(),element.getRightIToken(), leftRecursive);
            obj.list.add(element);
            (<ASTNode> element).setParent(obj);
            return obj;
        }

        public  addElement( _nameSpec : nameSpec) : void
        {
            super.addElement(<ASTNode> _nameSpec);
            (<ASTNode> _nameSpec).setParent(this);
        }


        public  accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }
        public enter(v : Visitor) : void
        {
            let checkChildren = v.visitnameSpecList(this);
            if (checkChildren)
            {
                for (let i = 0; i < this.size(); i++)
                {
                     let element = this.getnameSpecAt(i);
                    if (! v.preVisit(element)) continue;
                    element.enter(v);
                    v.postVisit(element);
                }
            }
            v.endVisitnameSpecList(this);
        }
    }

    /**
     *<b>
    *<li>Rule 89:  nameSpec ::= name produces name
     *</b>
     */
    export class nameSpec extends ASTNode implements InameSpec
    {
        private  _name : Iname;
        private  _produces : Iproduces;
        private  _name3 : Iname;

        public  getname() : Iname{ return this._name; }
        public  setname( _name : Iname) : void { this._name = _name; }
        public  getproduces() : Iproduces{ return this._produces; }
        public  setproduces( _produces : Iproduces) : void { this._produces = _produces; }
        public  getname3() : Iname{ return this._name3; }
        public  setname3( _name3 : Iname) : void { this._name3 = _name3; }

        constructor(leftIToken : IToken , rightIToken : IToken ,
                     _name : Iname,
                     _produces : Iproduces,
                     _name3 : Iname)
        {
            super(leftIToken, rightIToken)

            this._name = _name;
            (<ASTNode> _name).setParent(this);
            this._produces = _produces;
            (<ASTNode> _produces).setParent(this);
            this._name3 = _name3;
            (<ASTNode> _name3).setParent(this);
            this.initialize();
        }

        /**
         * A list of all children of this node, don't including the null ones.
         */
         public   getAllChildren() : Lpg.Util.ArrayList<IAst>
        {
            let list = new Lpg.Util.ArrayList<IAst>();
            if(this._name)  list.add(this._name);
            if(this._produces)  list.add(this._produces);
            if(this._name3)  list.add(this._name3);
            return list;
        }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            let checkChildren = v.visitnameSpec(this);
            if (checkChildren)
            {
                this._name.accept(v);
                this._produces.accept(v);
                this._name3.accept(v);
            }
            v.endVisitnameSpec(this);
        }
    }

    /**
     *<b>
    *<li>Rule 98:  rules_segment ::= action_segment_list nonTermList
     *</b>
     */
    export class rules_segment extends ASTNode implements Irules_segment
    {
        private  _action_segment_list : action_segmentList;
        private  _nonTermList : nonTermList;

        public  getaction_segment_list() : action_segmentList{ return this._action_segment_list; }
        public  setaction_segment_list( _action_segment_list : action_segmentList) : void { this._action_segment_list = _action_segment_list; }
        public  getnonTermList() : nonTermList{ return this._nonTermList; }
        public  setnonTermList( _nonTermList : nonTermList) : void { this._nonTermList = _nonTermList; }

        constructor(leftIToken : IToken , rightIToken : IToken ,
                     _action_segment_list : action_segmentList,
                     _nonTermList : nonTermList)
        {
            super(leftIToken, rightIToken)

            this._action_segment_list = _action_segment_list;
            (<ASTNode> _action_segment_list).setParent(this);
            this._nonTermList = _nonTermList;
            (<ASTNode> _nonTermList).setParent(this);
            this.initialize();
        }

        /**
         * A list of all children of this node, don't including the null ones.
         */
         public   getAllChildren() : Lpg.Util.ArrayList<IAst>
        {
            let list = new Lpg.Util.ArrayList<IAst>();
            if(this._action_segment_list)  list.add(this._action_segment_list);
            if(this._nonTermList)  list.add(this._nonTermList);
            return list;
        }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            let checkChildren = v.visitrules_segment(this);
            if (checkChildren)
            {
                this._action_segment_list.accept(v);
                this._nonTermList.accept(v);
            }
            v.endVisitrules_segment(this);
        }
    }

    /**
     *<b>
    *<li>Rule 99:  nonTermList ::= %Empty
    *<li>Rule 100:  nonTermList ::= nonTermList nonTerm
     *</b>
     */
    export class nonTermList extends AbstractASTNodeList implements InonTermList
    {
        public  getnonTermAt(i : number) : nonTerm{ return <nonTerm> this.getElementAt(i); }

        constructor(leftToken : IToken, rightToken : IToken , leftRecursive : boolean )
        {
            super(leftToken, rightToken, leftRecursive);
        }

       public static nonTermListfromElement(element : nonTerm,leftRecursive : boolean) : nonTermList
        {
            let obj = new nonTermList(element.getLeftIToken(),element.getRightIToken(), leftRecursive);
            obj.list.add(element);
            (<ASTNode> element).setParent(obj);
            return obj;
        }

        public  addElement( _nonTerm : nonTerm) : void
        {
            super.addElement(<ASTNode> _nonTerm);
            (<ASTNode> _nonTerm).setParent(this);
        }


        public  accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }
        public enter(v : Visitor) : void
        {
            let checkChildren = v.visitnonTermList(this);
            if (checkChildren)
            {
                for (let i = 0; i < this.size(); i++)
                {
                     let element = this.getnonTermAt(i);
                    if (! v.preVisit(element)) continue;
                    element.enter(v);
                    v.postVisit(element);
                }
            }
            v.endVisitnonTermList(this);
        }
    }

    /**
     *<b>
    *<li>Rule 101:  nonTerm ::= ruleNameWithAttributes produces ruleList
     *</b>
     */
    export class nonTerm extends ASTNode implements InonTerm
    {
        private  _ruleNameWithAttributes : RuleName;
        private  _produces : Iproduces;
        private  _ruleList : ruleList;

        public  getruleNameWithAttributes() : RuleName{ return this._ruleNameWithAttributes; }
        public  setruleNameWithAttributes( _ruleNameWithAttributes : RuleName) : void { this._ruleNameWithAttributes = _ruleNameWithAttributes; }
        public  getproduces() : Iproduces{ return this._produces; }
        public  setproduces( _produces : Iproduces) : void { this._produces = _produces; }
        public  getruleList() : ruleList{ return this._ruleList; }
        public  setruleList( _ruleList : ruleList) : void { this._ruleList = _ruleList; }

        constructor(leftIToken : IToken , rightIToken : IToken ,
                     _ruleNameWithAttributes : RuleName,
                     _produces : Iproduces,
                     _ruleList : ruleList)
        {
            super(leftIToken, rightIToken)

            this._ruleNameWithAttributes = _ruleNameWithAttributes;
            (<ASTNode> _ruleNameWithAttributes).setParent(this);
            this._produces = _produces;
            (<ASTNode> _produces).setParent(this);
            this._ruleList = _ruleList;
            (<ASTNode> _ruleList).setParent(this);
            this.initialize();
        }

        /**
         * A list of all children of this node, don't including the null ones.
         */
         public   getAllChildren() : Lpg.Util.ArrayList<IAst>
        {
            let list = new Lpg.Util.ArrayList<IAst>();
            if(this._ruleNameWithAttributes)  list.add(this._ruleNameWithAttributes);
            if(this._produces)  list.add(this._produces);
            if(this._ruleList)  list.add(this._ruleList);
            return list;
        }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            let checkChildren = v.visitnonTerm(this);
            if (checkChildren)
            {
                this._ruleNameWithAttributes.accept(v);
                this._produces.accept(v);
                this._ruleList.accept(v);
            }
            v.endVisitnonTerm(this);
        }
    }

    /**
     *<b>
    *<li>Rule 102:  ruleNameWithAttributes ::= SYMBOL
    *<li>Rule 103:  ruleNameWithAttributes ::= SYMBOL MACRO_NAME$className
    *<li>Rule 104:  ruleNameWithAttributes ::= SYMBOL MACRO_NAME$className MACRO_NAME$arrayElement
     *</b>
     */
    export class RuleName extends ASTNode implements IruleNameWithAttributes
    {
        private  _SYMBOL : ASTNodeToken;
        private  _className : ASTNodeToken | null;
        private  _arrayElement : ASTNodeToken | null;

        public  getSYMBOL() : ASTNodeToken{ return this._SYMBOL; }
        /**
         * The value returned by <b>getclassName</b> may be <b>null</b>
         */
        public  getclassName() : ASTNodeToken | null { return this._className; }
        /**
         * The value returned by <b>getarrayElement</b> may be <b>null</b>
         */
        public  getarrayElement() : ASTNodeToken | null { return this._arrayElement; }

        constructor(leftIToken : IToken , rightIToken : IToken ,
                     _SYMBOL : ASTNodeToken,
                     _className : ASTNodeToken | null,
                     _arrayElement : ASTNodeToken | null)
        {
            super(leftIToken, rightIToken);

            this._SYMBOL = _SYMBOL;
            (<ASTNode> _SYMBOL).setParent(this);
            this._className = _className;
            if (_className) (<ASTNode> _className).setParent(this);
            this._arrayElement = _arrayElement;
            if (_arrayElement) (<ASTNode> _arrayElement).setParent(this);
            this.initialize();
        }

        /**
         * A list of all children of this node, don't including the null ones.
         */
         public   getAllChildren() : Lpg.Util.ArrayList<IAst>
        {
            let list = new Lpg.Util.ArrayList<IAst>();
            if(this._SYMBOL)  list.add(this._SYMBOL);
            if(this._className)  list.add(this._className);
            if(this._arrayElement)  list.add(this._arrayElement);
            return list;
        }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            let checkChildren = v.visitRuleName(this);
            if (checkChildren)
            {
                this._SYMBOL.accept(v);
                if (this._className) this._className.accept(v);
                if (this._arrayElement) this._arrayElement.accept(v);
            }
            v.endVisitRuleName(this);
        }
    }

    /**
     *<b>
    *<li>Rule 105:  ruleList ::= rule
    *<li>Rule 106:  ruleList ::= ruleList |$ rule
     *</b>
     */
    export class ruleList extends AbstractASTNodeList implements IruleList
    {
        public  getruleAt(i : number) : rule{ return <rule> this.getElementAt(i); }

        constructor(leftToken : IToken, rightToken : IToken , leftRecursive : boolean )
        {
            super(leftToken, rightToken, leftRecursive);
        }

       public static ruleListfromElement(element : rule,leftRecursive : boolean) : ruleList
        {
            let obj = new ruleList(element.getLeftIToken(),element.getRightIToken(), leftRecursive);
            obj.list.add(element);
            (<ASTNode> element).setParent(obj);
            return obj;
        }

        public  addElement( _rule : rule) : void
        {
            super.addElement(<ASTNode> _rule);
            (<ASTNode> _rule).setParent(this);
        }


        public  accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }
        public enter(v : Visitor) : void
        {
            let checkChildren = v.visitruleList(this);
            if (checkChildren)
            {
                for (let i = 0; i < this.size(); i++)
                {
                     let element = this.getruleAt(i);
                    if (! v.preVisit(element)) continue;
                    element.enter(v);
                    v.postVisit(element);
                }
            }
            v.endVisitruleList(this);
        }
    }

    /**
     *<b>
    *<li>Rule 111:  rule ::= symWithAttrsList action_segment_list
     *</b>
     */
    export class rule extends ASTNode implements Irule
    {
        private  _symWithAttrsList : symWithAttrsList;
        private  _action_segment_list : action_segmentList;

        public  getsymWithAttrsList() : symWithAttrsList{ return this._symWithAttrsList; }
        public  setsymWithAttrsList( _symWithAttrsList : symWithAttrsList) : void { this._symWithAttrsList = _symWithAttrsList; }
        public  getaction_segment_list() : action_segmentList{ return this._action_segment_list; }
        public  setaction_segment_list( _action_segment_list : action_segmentList) : void { this._action_segment_list = _action_segment_list; }

        constructor(leftIToken : IToken , rightIToken : IToken ,
                     _symWithAttrsList : symWithAttrsList,
                     _action_segment_list : action_segmentList)
        {
            super(leftIToken, rightIToken)

            this._symWithAttrsList = _symWithAttrsList;
            (<ASTNode> _symWithAttrsList).setParent(this);
            this._action_segment_list = _action_segment_list;
            (<ASTNode> _action_segment_list).setParent(this);
            this.initialize();
        }

        /**
         * A list of all children of this node, don't including the null ones.
         */
         public   getAllChildren() : Lpg.Util.ArrayList<IAst>
        {
            let list = new Lpg.Util.ArrayList<IAst>();
            if(this._symWithAttrsList)  list.add(this._symWithAttrsList);
            if(this._action_segment_list)  list.add(this._action_segment_list);
            return list;
        }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            let checkChildren = v.visitrule(this);
            if (checkChildren)
            {
                this._symWithAttrsList.accept(v);
                this._action_segment_list.accept(v);
            }
            v.endVisitrule(this);
        }
    }

    /**
     *<b>
    *<li>Rule 112:  symWithAttrsList ::= %Empty
    *<li>Rule 113:  symWithAttrsList ::= symWithAttrsList symWithAttrs
     *</b>
     */
    export class symWithAttrsList extends AbstractASTNodeList implements IsymWithAttrsList
    {
        public  getsymWithAttrsAt(i : number) : IsymWithAttrs{ return <IsymWithAttrs> this.getElementAt(i); }

        constructor(leftToken : IToken, rightToken : IToken , leftRecursive : boolean )
        {
            super(leftToken, rightToken, leftRecursive);
        }

       public static symWithAttrsListfromElement(element : IsymWithAttrs,leftRecursive : boolean) : symWithAttrsList
        {
            let obj = new symWithAttrsList(element.getLeftIToken(),element.getRightIToken(), leftRecursive);
            obj.list.add(element);
            (<ASTNode> element).setParent(obj);
            return obj;
        }

        public  addElement( _symWithAttrs : IsymWithAttrs) : void
        {
            super.addElement(<ASTNode> _symWithAttrs);
            (<ASTNode> _symWithAttrs).setParent(this);
        }


        public  accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }
        public enter(v : Visitor) : void
        {
            let checkChildren = v.visitsymWithAttrsList(this);
            if (checkChildren)
            {
                for (let i = 0; i < this.size(); i++)
                {
                    let element = this.getsymWithAttrsAt(i);
                    element.accept(v);
                }
            }
            v.endVisitsymWithAttrsList(this);
        }
    }

    /**
     *<b>
    *<li>Rule 116:  optAttrList ::= %Empty
    *<li>Rule 117:  optAttrList ::= MACRO_NAME
     *</b>
     */
    export class symAttrs extends ASTNode implements IoptAttrList
    {
        private  _MACRO_NAME : ASTNodeToken | null;

        /**
         * The value returned by <b>getMACRO_NAME</b> may be <b>null</b>
         */
        public  getMACRO_NAME() : ASTNodeToken | null { return this._MACRO_NAME; }

        constructor(leftIToken : IToken , rightIToken : IToken ,
                     _MACRO_NAME : ASTNodeToken | null)
        {
            super(leftIToken, rightIToken);

            this._MACRO_NAME = _MACRO_NAME;
            if (_MACRO_NAME) (<ASTNode> _MACRO_NAME).setParent(this);
            this.initialize();
        }

        /**
         * A list of all children of this node, don't including the null ones.
         */
         public   getAllChildren() : Lpg.Util.ArrayList<IAst>
        {
            let list = new Lpg.Util.ArrayList<IAst>();
            if(this._MACRO_NAME)  list.add(this._MACRO_NAME);
            return list;
        }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            let checkChildren = v.visitsymAttrs(this);
            if (checkChildren)
                if (this._MACRO_NAME) this._MACRO_NAME.accept(v);
            v.endVisitsymAttrs(this);
        }
    }

    /**
     *<b>
    *<li>Rule 120:  action_segment ::= BLOCK
     *</b>
     */
    export class action_segment extends ASTNodeToken implements Iaction_segment
    {
        public  getBLOCK() : IToken { return this.leftIToken; }

    constructor(token : IToken ) { super(token); this.initialize(); }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            v.visitaction_segment(this);
            v.endVisitaction_segment(this);
        }
    }

    /**
     *<b>
    *<li>Rule 121:  start_segment ::= start_symbol
    *<li>Rule 122:  start_segment ::= start_segment start_symbol
     *</b>
     */
    export class start_symbolList extends AbstractASTNodeList implements Istart_segment
    {
        public  getstart_symbolAt(i : number) : Istart_symbol{ return <Istart_symbol> this.getElementAt(i); }

        constructor(leftToken : IToken, rightToken : IToken , leftRecursive : boolean )
        {
            super(leftToken, rightToken, leftRecursive);
        }

       public static start_symbolListfromElement(element : Istart_symbol,leftRecursive : boolean) : start_symbolList
        {
            let obj = new start_symbolList(element.getLeftIToken(),element.getRightIToken(), leftRecursive);
            obj.list.add(element);
            (<ASTNode> element).setParent(obj);
            return obj;
        }

        public  addElement( _start_symbol : Istart_symbol) : void
        {
            super.addElement(<ASTNode> _start_symbol);
            (<ASTNode> _start_symbol).setParent(this);
        }


        public  accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }
        public enter(v : Visitor) : void
        {
            let checkChildren = v.visitstart_symbolList(this);
            if (checkChildren)
            {
                for (let i = 0; i < this.size(); i++)
                {
                    let element = this.getstart_symbolAt(i);
                    element.accept(v);
                }
            }
            v.endVisitstart_symbolList(this);
        }
    }

    /**
     *<b>
    *<li>Rule 125:  terminals_segment ::= terminal
    *<li>Rule 126:  terminals_segment ::= terminals_segment terminal
     *</b>
     */
    export class terminalList extends AbstractASTNodeList implements Iterminals_segment
    {
        public  getterminalAt(i : number) : terminal{ return <terminal> this.getElementAt(i); }

        constructor(leftToken : IToken, rightToken : IToken , leftRecursive : boolean )
        {
            super(leftToken, rightToken, leftRecursive);
        }

       public static terminalListfromElement(element : terminal,leftRecursive : boolean) : terminalList
        {
            let obj = new terminalList(element.getLeftIToken(),element.getRightIToken(), leftRecursive);
            obj.list.add(element);
            (<ASTNode> element).setParent(obj);
            return obj;
        }

        public  addElement( _terminal : terminal) : void
        {
            super.addElement(<ASTNode> _terminal);
            (<ASTNode> _terminal).setParent(this);
        }


        public  accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }
        public enter(v : Visitor) : void
        {
            let checkChildren = v.visitterminalList(this);
            if (checkChildren)
            {
                for (let i = 0; i < this.size(); i++)
                {
                     let element = this.getterminalAt(i);
                    if (! v.preVisit(element)) continue;
                    element.enter(v);
                    v.postVisit(element);
                }
            }
            v.endVisitterminalList(this);
        }
    }

    /**
     *<b>
    *<li>Rule 125:  terminals_segment ::= terminal
    *<li>Rule 126:  terminals_segment ::= terminals_segment terminal
     *</b>
     */
    export class terminals_segment_terminalList extends terminalList
    {
        private  environment : LPGParser;
        public  getEnvironment() :LPGParser{ return this.environment; }

        constructor(environment : LPGParser, leftIToken : IToken,  rightIToken : IToken, leftRecursive : boolean)
        {
            super(leftIToken, rightIToken, leftRecursive);
            this.environment = environment;
            this.initialize();
        }

       public static  terminals_segment_terminalListfromElement(environment : LPGParser,element : terminal,leftRecursive : boolean) : terminals_segment_terminalList
        {
            let obj = new terminals_segment_terminalList(environment,element.getLeftIToken(),element.getRightIToken(), leftRecursive);
            obj.list.add(element);
            (<ASTNode> element).setParent(obj);
            return obj;
        }

    }

    /**
     *<b>
    *<li>Rule 127:  terminal ::= terminal_symbol optTerminalAlias
     *</b>
     */
    export class terminal extends ASTNode implements Iterminal
    {
        private  _terminal_symbol : Iterminal_symbol;
        private  _optTerminalAlias : optTerminalAlias| null;

        public  getterminal_symbol() : Iterminal_symbol{ return this._terminal_symbol; }
        public  setterminal_symbol( _terminal_symbol : Iterminal_symbol) : void { this._terminal_symbol = _terminal_symbol; }
        /**
         * The value returned by <b>getoptTerminalAlias</b> may be <b>null</b>
         */
        public  getoptTerminalAlias() : optTerminalAlias | null { return this._optTerminalAlias; }
        public  setoptTerminalAlias( _optTerminalAlias : optTerminalAlias) : void { this._optTerminalAlias = _optTerminalAlias; }

        constructor(leftIToken : IToken , rightIToken : IToken ,
                     _terminal_symbol : Iterminal_symbol,
                     _optTerminalAlias : optTerminalAlias| null)
        {
            super(leftIToken, rightIToken)

            this._terminal_symbol = _terminal_symbol;
            (<ASTNode> _terminal_symbol).setParent(this);
            this._optTerminalAlias = _optTerminalAlias;
            if (_optTerminalAlias) (<ASTNode> _optTerminalAlias).setParent(this);
            this.initialize();
        }

        /**
         * A list of all children of this node, don't including the null ones.
         */
         public   getAllChildren() : Lpg.Util.ArrayList<IAst>
        {
            let list = new Lpg.Util.ArrayList<IAst>();
            if(this._terminal_symbol)  list.add(this._terminal_symbol);
            if(this._optTerminalAlias)  list.add(this._optTerminalAlias);
            return list;
        }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            let checkChildren = v.visitterminal(this);
            if (checkChildren)
            {
                this._terminal_symbol.accept(v);
                if (this._optTerminalAlias) this._optTerminalAlias.accept(v);
            }
            v.endVisitterminal(this);
        }
    }

    /**
     *<em>
    *<li>Rule 128:  optTerminalAlias ::= %Empty
     *</em>
     *<p>
     *<b>
    *<li>Rule 129:  optTerminalAlias ::= produces name
     *</b>
     */
    export class optTerminalAlias extends ASTNode implements IoptTerminalAlias
    {
        private  _produces : Iproduces;
        private  _name : Iname;

        public  getproduces() : Iproduces{ return this._produces; }
        public  setproduces( _produces : Iproduces) : void { this._produces = _produces; }
        public  getname() : Iname{ return this._name; }
        public  setname( _name : Iname) : void { this._name = _name; }

        constructor(leftIToken : IToken , rightIToken : IToken ,
                     _produces : Iproduces,
                     _name : Iname)
        {
            super(leftIToken, rightIToken)

            this._produces = _produces;
            (<ASTNode> _produces).setParent(this);
            this._name = _name;
            (<ASTNode> _name).setParent(this);
            this.initialize();
        }

        /**
         * A list of all children of this node, don't including the null ones.
         */
         public   getAllChildren() : Lpg.Util.ArrayList<IAst>
        {
            let list = new Lpg.Util.ArrayList<IAst>();
            if(this._produces)  list.add(this._produces);
            if(this._name)  list.add(this._name);
            return list;
        }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            let checkChildren = v.visitoptTerminalAlias(this);
            if (checkChildren)
            {
                this._produces.accept(v);
                this._name.accept(v);
            }
            v.endVisitoptTerminalAlias(this);
        }
    }

    /**
     *<b>
    *<li>Rule 133:  types_segment ::= type_declarations
    *<li>Rule 134:  types_segment ::= types_segment type_declarations
     *</b>
     */
    export class type_declarationsList extends AbstractASTNodeList implements Itypes_segment
    {
        public  gettype_declarationsAt(i : number) : type_declarations{ return <type_declarations> this.getElementAt(i); }

        constructor(leftToken : IToken, rightToken : IToken , leftRecursive : boolean )
        {
            super(leftToken, rightToken, leftRecursive);
        }

       public static type_declarationsListfromElement(element : type_declarations,leftRecursive : boolean) : type_declarationsList
        {
            let obj = new type_declarationsList(element.getLeftIToken(),element.getRightIToken(), leftRecursive);
            obj.list.add(element);
            (<ASTNode> element).setParent(obj);
            return obj;
        }

        public  addElement( _type_declarations : type_declarations) : void
        {
            super.addElement(<ASTNode> _type_declarations);
            (<ASTNode> _type_declarations).setParent(this);
        }


        public  accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }
        public enter(v : Visitor) : void
        {
            let checkChildren = v.visittype_declarationsList(this);
            if (checkChildren)
            {
                for (let i = 0; i < this.size(); i++)
                {
                     let element = this.gettype_declarationsAt(i);
                    if (! v.preVisit(element)) continue;
                    element.enter(v);
                    v.postVisit(element);
                }
            }
            v.endVisittype_declarationsList(this);
        }
    }

    /**
     *<b>
    *<li>Rule 135:  type_declarations ::= SYMBOL produces barSymbolList opt_action_segment
     *</b>
     */
    export class type_declarations extends ASTNode implements Itype_declarations
    {
        private  _SYMBOL : ASTNodeToken;
        private  _produces : Iproduces;
        private  _barSymbolList : SYMBOLList;
        private  _opt_action_segment : action_segment| null;

        public  getSYMBOL() : ASTNodeToken{ return this._SYMBOL; }
        public  setSYMBOL( _SYMBOL : ASTNodeToken) : void { this._SYMBOL = _SYMBOL; }
        public  getproduces() : Iproduces{ return this._produces; }
        public  setproduces( _produces : Iproduces) : void { this._produces = _produces; }
        public  getbarSymbolList() : SYMBOLList{ return this._barSymbolList; }
        public  setbarSymbolList( _barSymbolList : SYMBOLList) : void { this._barSymbolList = _barSymbolList; }
        /**
         * The value returned by <b>getopt_action_segment</b> may be <b>null</b>
         */
        public  getopt_action_segment() : action_segment | null { return this._opt_action_segment; }
        public  setopt_action_segment( _opt_action_segment : action_segment) : void { this._opt_action_segment = _opt_action_segment; }

        constructor(leftIToken : IToken , rightIToken : IToken ,
                     _SYMBOL : ASTNodeToken,
                     _produces : Iproduces,
                     _barSymbolList : SYMBOLList,
                     _opt_action_segment : action_segment| null)
        {
            super(leftIToken, rightIToken)

            this._SYMBOL = _SYMBOL;
            (<ASTNode> _SYMBOL).setParent(this);
            this._produces = _produces;
            (<ASTNode> _produces).setParent(this);
            this._barSymbolList = _barSymbolList;
            (<ASTNode> _barSymbolList).setParent(this);
            this._opt_action_segment = _opt_action_segment;
            if (_opt_action_segment) (<ASTNode> _opt_action_segment).setParent(this);
            this.initialize();
        }

        /**
         * A list of all children of this node, don't including the null ones.
         */
         public   getAllChildren() : Lpg.Util.ArrayList<IAst>
        {
            let list = new Lpg.Util.ArrayList<IAst>();
            if(this._SYMBOL)  list.add(this._SYMBOL);
            if(this._produces)  list.add(this._produces);
            if(this._barSymbolList)  list.add(this._barSymbolList);
            if(this._opt_action_segment)  list.add(this._opt_action_segment);
            return list;
        }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            let checkChildren = v.visittype_declarations(this);
            if (checkChildren)
            {
                this._SYMBOL.accept(v);
                this._produces.accept(v);
                this._barSymbolList.accept(v);
                if (this._opt_action_segment) this._opt_action_segment.accept(v);
            }
            v.endVisittype_declarations(this);
        }
    }

    /**
     *<b>
    *<li>Rule 138:  predecessor_segment ::= %Empty
    *<li>Rule 139:  predecessor_segment ::= predecessor_segment symbol_pair
     *</b>
     */
    export class symbol_pairList extends AbstractASTNodeList implements Ipredecessor_segment
    {
        public  getsymbol_pairAt(i : number) : symbol_pair{ return <symbol_pair> this.getElementAt(i); }

        constructor(leftToken : IToken, rightToken : IToken , leftRecursive : boolean )
        {
            super(leftToken, rightToken, leftRecursive);
        }

       public static symbol_pairListfromElement(element : symbol_pair,leftRecursive : boolean) : symbol_pairList
        {
            let obj = new symbol_pairList(element.getLeftIToken(),element.getRightIToken(), leftRecursive);
            obj.list.add(element);
            (<ASTNode> element).setParent(obj);
            return obj;
        }

        public  addElement( _symbol_pair : symbol_pair) : void
        {
            super.addElement(<ASTNode> _symbol_pair);
            (<ASTNode> _symbol_pair).setParent(this);
        }


        public  accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }
        public enter(v : Visitor) : void
        {
            let checkChildren = v.visitsymbol_pairList(this);
            if (checkChildren)
            {
                for (let i = 0; i < this.size(); i++)
                {
                     let element = this.getsymbol_pairAt(i);
                    if (! v.preVisit(element)) continue;
                    element.enter(v);
                    v.postVisit(element);
                }
            }
            v.endVisitsymbol_pairList(this);
        }
    }

    /**
     *<b>
    *<li>Rule 140:  symbol_pair ::= SYMBOL SYMBOL
     *</b>
     */
    export class symbol_pair extends ASTNode implements Isymbol_pair
    {
        private  _SYMBOL : ASTNodeToken;
        private  _SYMBOL2 : ASTNodeToken;

        public  getSYMBOL() : ASTNodeToken{ return this._SYMBOL; }
        public  setSYMBOL( _SYMBOL : ASTNodeToken) : void { this._SYMBOL = _SYMBOL; }
        public  getSYMBOL2() : ASTNodeToken{ return this._SYMBOL2; }
        public  setSYMBOL2( _SYMBOL2 : ASTNodeToken) : void { this._SYMBOL2 = _SYMBOL2; }

        constructor(leftIToken : IToken , rightIToken : IToken ,
                     _SYMBOL : ASTNodeToken,
                     _SYMBOL2 : ASTNodeToken)
        {
            super(leftIToken, rightIToken)

            this._SYMBOL = _SYMBOL;
            (<ASTNode> _SYMBOL).setParent(this);
            this._SYMBOL2 = _SYMBOL2;
            (<ASTNode> _SYMBOL2).setParent(this);
            this.initialize();
        }

        /**
         * A list of all children of this node, don't including the null ones.
         */
         public   getAllChildren() : Lpg.Util.ArrayList<IAst>
        {
            let list = new Lpg.Util.ArrayList<IAst>();
            if(this._SYMBOL)  list.add(this._SYMBOL);
            if(this._SYMBOL2)  list.add(this._SYMBOL2);
            return list;
        }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            let checkChildren = v.visitsymbol_pair(this);
            if (checkChildren)
            {
                this._SYMBOL.accept(v);
                this._SYMBOL2.accept(v);
            }
            v.endVisitsymbol_pair(this);
        }
    }

    /**
     *<b>
    *<li>Rule 143:  recover_symbol ::= SYMBOL
     *</b>
     */
    export class recover_symbol extends ASTNodeToken implements Irecover_symbol
    {
        public  getSYMBOL() : IToken { return this.leftIToken; }

    constructor(token : IToken ) { super(token); this.initialize(); }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            v.visitrecover_symbol(this);
            v.endVisitrecover_symbol(this);
        }
    }

    /**
     *<em>
    *<li>Rule 144:  END_KEY_OPT ::= %Empty
     *</em>
     *<p>
     *<b>
    *<li>Rule 145:  END_KEY_OPT ::= END_KEY
     *</b>
     */
    export class END_KEY_OPT extends ASTNodeToken implements IEND_KEY_OPT
    {
        public  getEND_KEY() : IToken { return this.leftIToken; }

    constructor(token : IToken ) { super(token); this.initialize(); }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            v.visitEND_KEY_OPT(this);
            v.endVisitEND_KEY_OPT(this);
        }
    }

    /**
     *<b>
    *<li>Rule 34:  option_value ::= =$ SYMBOL
     *</b>
     */
    export class option_value0 extends ASTNode implements Ioption_value
    {
        private  _SYMBOL : ASTNodeToken;

        public  getSYMBOL() : ASTNodeToken{ return this._SYMBOL; }
        public  setSYMBOL( _SYMBOL : ASTNodeToken) : void { this._SYMBOL = _SYMBOL; }

        constructor(leftIToken : IToken , rightIToken : IToken ,
                     _SYMBOL : ASTNodeToken)
        {
            super(leftIToken, rightIToken)

            this._SYMBOL = _SYMBOL;
            (<ASTNode> _SYMBOL).setParent(this);
            this.initialize();
        }

        /**
         * A list of all children of this node, don't including the null ones.
         */
         public   getAllChildren() : Lpg.Util.ArrayList<IAst>
        {
            let list = new Lpg.Util.ArrayList<IAst>();
            if(this._SYMBOL)  list.add(this._SYMBOL);
            return list;
        }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            let checkChildren = v.visitoption_value0(this);
            if (checkChildren)
                this._SYMBOL.accept(v);
            v.endVisitoption_value0(this);
        }
    }

    /**
     *<b>
    *<li>Rule 35:  option_value ::= =$ ($ symbol_list )$
     *</b>
     */
    export class option_value1 extends ASTNode implements Ioption_value
    {
        private  _symbol_list : SYMBOLList;

        public  getsymbol_list() : SYMBOLList{ return this._symbol_list; }
        public  setsymbol_list( _symbol_list : SYMBOLList) : void { this._symbol_list = _symbol_list; }

        constructor(leftIToken : IToken , rightIToken : IToken ,
                     _symbol_list : SYMBOLList)
        {
            super(leftIToken, rightIToken)

            this._symbol_list = _symbol_list;
            (<ASTNode> _symbol_list).setParent(this);
            this.initialize();
        }

        /**
         * A list of all children of this node, don't including the null ones.
         */
         public   getAllChildren() : Lpg.Util.ArrayList<IAst>
        {
            let list = new Lpg.Util.ArrayList<IAst>();
            if(this._symbol_list)  list.add(this._symbol_list);
            return list;
        }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            let checkChildren = v.visitoption_value1(this);
            if (checkChildren)
                this._symbol_list.accept(v);
            v.endVisitoption_value1(this);
        }
    }

    /**
     *<b>
    *<li>Rule 40:  aliasSpec ::= ERROR_KEY produces alias_rhs
     *</b>
     */
    export class aliasSpec0 extends ASTNode implements IaliasSpec
    {
        private  _ERROR_KEY : ASTNodeToken;
        private  _produces : Iproduces;
        private  _alias_rhs : Ialias_rhs;

        public  getERROR_KEY() : ASTNodeToken{ return this._ERROR_KEY; }
        public  setERROR_KEY( _ERROR_KEY : ASTNodeToken) : void { this._ERROR_KEY = _ERROR_KEY; }
        public  getproduces() : Iproduces{ return this._produces; }
        public  setproduces( _produces : Iproduces) : void { this._produces = _produces; }
        public  getalias_rhs() : Ialias_rhs{ return this._alias_rhs; }
        public  setalias_rhs( _alias_rhs : Ialias_rhs) : void { this._alias_rhs = _alias_rhs; }

        constructor(leftIToken : IToken , rightIToken : IToken ,
                     _ERROR_KEY : ASTNodeToken,
                     _produces : Iproduces,
                     _alias_rhs : Ialias_rhs)
        {
            super(leftIToken, rightIToken)

            this._ERROR_KEY = _ERROR_KEY;
            (<ASTNode> _ERROR_KEY).setParent(this);
            this._produces = _produces;
            (<ASTNode> _produces).setParent(this);
            this._alias_rhs = _alias_rhs;
            (<ASTNode> _alias_rhs).setParent(this);
            this.initialize();
        }

        /**
         * A list of all children of this node, don't including the null ones.
         */
         public   getAllChildren() : Lpg.Util.ArrayList<IAst>
        {
            let list = new Lpg.Util.ArrayList<IAst>();
            if(this._ERROR_KEY)  list.add(this._ERROR_KEY);
            if(this._produces)  list.add(this._produces);
            if(this._alias_rhs)  list.add(this._alias_rhs);
            return list;
        }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            let checkChildren = v.visitaliasSpec0(this);
            if (checkChildren)
            {
                this._ERROR_KEY.accept(v);
                this._produces.accept(v);
                this._alias_rhs.accept(v);
            }
            v.endVisitaliasSpec0(this);
        }
    }

    /**
     *<b>
    *<li>Rule 41:  aliasSpec ::= EOL_KEY produces alias_rhs
     *</b>
     */
    export class aliasSpec1 extends ASTNode implements IaliasSpec
    {
        private  _EOL_KEY : ASTNodeToken;
        private  _produces : Iproduces;
        private  _alias_rhs : Ialias_rhs;

        public  getEOL_KEY() : ASTNodeToken{ return this._EOL_KEY; }
        public  setEOL_KEY( _EOL_KEY : ASTNodeToken) : void { this._EOL_KEY = _EOL_KEY; }
        public  getproduces() : Iproduces{ return this._produces; }
        public  setproduces( _produces : Iproduces) : void { this._produces = _produces; }
        public  getalias_rhs() : Ialias_rhs{ return this._alias_rhs; }
        public  setalias_rhs( _alias_rhs : Ialias_rhs) : void { this._alias_rhs = _alias_rhs; }

        constructor(leftIToken : IToken , rightIToken : IToken ,
                     _EOL_KEY : ASTNodeToken,
                     _produces : Iproduces,
                     _alias_rhs : Ialias_rhs)
        {
            super(leftIToken, rightIToken)

            this._EOL_KEY = _EOL_KEY;
            (<ASTNode> _EOL_KEY).setParent(this);
            this._produces = _produces;
            (<ASTNode> _produces).setParent(this);
            this._alias_rhs = _alias_rhs;
            (<ASTNode> _alias_rhs).setParent(this);
            this.initialize();
        }

        /**
         * A list of all children of this node, don't including the null ones.
         */
         public   getAllChildren() : Lpg.Util.ArrayList<IAst>
        {
            let list = new Lpg.Util.ArrayList<IAst>();
            if(this._EOL_KEY)  list.add(this._EOL_KEY);
            if(this._produces)  list.add(this._produces);
            if(this._alias_rhs)  list.add(this._alias_rhs);
            return list;
        }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            let checkChildren = v.visitaliasSpec1(this);
            if (checkChildren)
            {
                this._EOL_KEY.accept(v);
                this._produces.accept(v);
                this._alias_rhs.accept(v);
            }
            v.endVisitaliasSpec1(this);
        }
    }

    /**
     *<b>
    *<li>Rule 42:  aliasSpec ::= EOF_KEY produces alias_rhs
     *</b>
     */
    export class aliasSpec2 extends ASTNode implements IaliasSpec
    {
        private  _EOF_KEY : ASTNodeToken;
        private  _produces : Iproduces;
        private  _alias_rhs : Ialias_rhs;

        public  getEOF_KEY() : ASTNodeToken{ return this._EOF_KEY; }
        public  setEOF_KEY( _EOF_KEY : ASTNodeToken) : void { this._EOF_KEY = _EOF_KEY; }
        public  getproduces() : Iproduces{ return this._produces; }
        public  setproduces( _produces : Iproduces) : void { this._produces = _produces; }
        public  getalias_rhs() : Ialias_rhs{ return this._alias_rhs; }
        public  setalias_rhs( _alias_rhs : Ialias_rhs) : void { this._alias_rhs = _alias_rhs; }

        constructor(leftIToken : IToken , rightIToken : IToken ,
                     _EOF_KEY : ASTNodeToken,
                     _produces : Iproduces,
                     _alias_rhs : Ialias_rhs)
        {
            super(leftIToken, rightIToken)

            this._EOF_KEY = _EOF_KEY;
            (<ASTNode> _EOF_KEY).setParent(this);
            this._produces = _produces;
            (<ASTNode> _produces).setParent(this);
            this._alias_rhs = _alias_rhs;
            (<ASTNode> _alias_rhs).setParent(this);
            this.initialize();
        }

        /**
         * A list of all children of this node, don't including the null ones.
         */
         public   getAllChildren() : Lpg.Util.ArrayList<IAst>
        {
            let list = new Lpg.Util.ArrayList<IAst>();
            if(this._EOF_KEY)  list.add(this._EOF_KEY);
            if(this._produces)  list.add(this._produces);
            if(this._alias_rhs)  list.add(this._alias_rhs);
            return list;
        }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            let checkChildren = v.visitaliasSpec2(this);
            if (checkChildren)
            {
                this._EOF_KEY.accept(v);
                this._produces.accept(v);
                this._alias_rhs.accept(v);
            }
            v.endVisitaliasSpec2(this);
        }
    }

    /**
     *<b>
    *<li>Rule 43:  aliasSpec ::= IDENTIFIER_KEY produces alias_rhs
     *</b>
     */
    export class aliasSpec3 extends ASTNode implements IaliasSpec
    {
        private  _IDENTIFIER_KEY : ASTNodeToken;
        private  _produces : Iproduces;
        private  _alias_rhs : Ialias_rhs;

        public  getIDENTIFIER_KEY() : ASTNodeToken{ return this._IDENTIFIER_KEY; }
        public  setIDENTIFIER_KEY( _IDENTIFIER_KEY : ASTNodeToken) : void { this._IDENTIFIER_KEY = _IDENTIFIER_KEY; }
        public  getproduces() : Iproduces{ return this._produces; }
        public  setproduces( _produces : Iproduces) : void { this._produces = _produces; }
        public  getalias_rhs() : Ialias_rhs{ return this._alias_rhs; }
        public  setalias_rhs( _alias_rhs : Ialias_rhs) : void { this._alias_rhs = _alias_rhs; }

        constructor(leftIToken : IToken , rightIToken : IToken ,
                     _IDENTIFIER_KEY : ASTNodeToken,
                     _produces : Iproduces,
                     _alias_rhs : Ialias_rhs)
        {
            super(leftIToken, rightIToken)

            this._IDENTIFIER_KEY = _IDENTIFIER_KEY;
            (<ASTNode> _IDENTIFIER_KEY).setParent(this);
            this._produces = _produces;
            (<ASTNode> _produces).setParent(this);
            this._alias_rhs = _alias_rhs;
            (<ASTNode> _alias_rhs).setParent(this);
            this.initialize();
        }

        /**
         * A list of all children of this node, don't including the null ones.
         */
         public   getAllChildren() : Lpg.Util.ArrayList<IAst>
        {
            let list = new Lpg.Util.ArrayList<IAst>();
            if(this._IDENTIFIER_KEY)  list.add(this._IDENTIFIER_KEY);
            if(this._produces)  list.add(this._produces);
            if(this._alias_rhs)  list.add(this._alias_rhs);
            return list;
        }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            let checkChildren = v.visitaliasSpec3(this);
            if (checkChildren)
            {
                this._IDENTIFIER_KEY.accept(v);
                this._produces.accept(v);
                this._alias_rhs.accept(v);
            }
            v.endVisitaliasSpec3(this);
        }
    }

    /**
     *<b>
    *<li>Rule 44:  aliasSpec ::= SYMBOL produces alias_rhs
     *</b>
     */
    export class aliasSpec4 extends ASTNode implements IaliasSpec
    {
        private  _SYMBOL : ASTNodeToken;
        private  _produces : Iproduces;
        private  _alias_rhs : Ialias_rhs;

        public  getSYMBOL() : ASTNodeToken{ return this._SYMBOL; }
        public  setSYMBOL( _SYMBOL : ASTNodeToken) : void { this._SYMBOL = _SYMBOL; }
        public  getproduces() : Iproduces{ return this._produces; }
        public  setproduces( _produces : Iproduces) : void { this._produces = _produces; }
        public  getalias_rhs() : Ialias_rhs{ return this._alias_rhs; }
        public  setalias_rhs( _alias_rhs : Ialias_rhs) : void { this._alias_rhs = _alias_rhs; }

        constructor(leftIToken : IToken , rightIToken : IToken ,
                     _SYMBOL : ASTNodeToken,
                     _produces : Iproduces,
                     _alias_rhs : Ialias_rhs)
        {
            super(leftIToken, rightIToken)

            this._SYMBOL = _SYMBOL;
            (<ASTNode> _SYMBOL).setParent(this);
            this._produces = _produces;
            (<ASTNode> _produces).setParent(this);
            this._alias_rhs = _alias_rhs;
            (<ASTNode> _alias_rhs).setParent(this);
            this.initialize();
        }

        /**
         * A list of all children of this node, don't including the null ones.
         */
         public   getAllChildren() : Lpg.Util.ArrayList<IAst>
        {
            let list = new Lpg.Util.ArrayList<IAst>();
            if(this._SYMBOL)  list.add(this._SYMBOL);
            if(this._produces)  list.add(this._produces);
            if(this._alias_rhs)  list.add(this._alias_rhs);
            return list;
        }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            let checkChildren = v.visitaliasSpec4(this);
            if (checkChildren)
            {
                this._SYMBOL.accept(v);
                this._produces.accept(v);
                this._alias_rhs.accept(v);
            }
            v.endVisitaliasSpec4(this);
        }
    }

    /**
     *<b>
    *<li>Rule 45:  aliasSpec ::= alias_lhs_macro_name produces alias_rhs
     *</b>
     */
    export class aliasSpec5 extends ASTNode implements IaliasSpec
    {
        private  _alias_lhs_macro_name : alias_lhs_macro_name;
        private  _produces : Iproduces;
        private  _alias_rhs : Ialias_rhs;

        public  getalias_lhs_macro_name() : alias_lhs_macro_name{ return this._alias_lhs_macro_name; }
        public  setalias_lhs_macro_name( _alias_lhs_macro_name : alias_lhs_macro_name) : void { this._alias_lhs_macro_name = _alias_lhs_macro_name; }
        public  getproduces() : Iproduces{ return this._produces; }
        public  setproduces( _produces : Iproduces) : void { this._produces = _produces; }
        public  getalias_rhs() : Ialias_rhs{ return this._alias_rhs; }
        public  setalias_rhs( _alias_rhs : Ialias_rhs) : void { this._alias_rhs = _alias_rhs; }

        constructor(leftIToken : IToken , rightIToken : IToken ,
                     _alias_lhs_macro_name : alias_lhs_macro_name,
                     _produces : Iproduces,
                     _alias_rhs : Ialias_rhs)
        {
            super(leftIToken, rightIToken)

            this._alias_lhs_macro_name = _alias_lhs_macro_name;
            (<ASTNode> _alias_lhs_macro_name).setParent(this);
            this._produces = _produces;
            (<ASTNode> _produces).setParent(this);
            this._alias_rhs = _alias_rhs;
            (<ASTNode> _alias_rhs).setParent(this);
            this.initialize();
        }

        /**
         * A list of all children of this node, don't including the null ones.
         */
         public   getAllChildren() : Lpg.Util.ArrayList<IAst>
        {
            let list = new Lpg.Util.ArrayList<IAst>();
            if(this._alias_lhs_macro_name)  list.add(this._alias_lhs_macro_name);
            if(this._produces)  list.add(this._produces);
            if(this._alias_rhs)  list.add(this._alias_rhs);
            return list;
        }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            let checkChildren = v.visitaliasSpec5(this);
            if (checkChildren)
            {
                this._alias_lhs_macro_name.accept(v);
                this._produces.accept(v);
                this._alias_rhs.accept(v);
            }
            v.endVisitaliasSpec5(this);
        }
    }

    /**
     *<b>
    *<li>Rule 47:  alias_rhs ::= SYMBOL
     *</b>
     */
    export class alias_rhs0 extends ASTNodeToken implements Ialias_rhs
    {
        public  getSYMBOL() : IToken { return this.leftIToken; }

    constructor(token : IToken ) { super(token); this.initialize(); }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            v.visitalias_rhs0(this);
            v.endVisitalias_rhs0(this);
        }
    }

    /**
     *<b>
    *<li>Rule 48:  alias_rhs ::= MACRO_NAME
     *</b>
     */
    export class alias_rhs1 extends ASTNodeToken implements Ialias_rhs
    {
        public  getMACRO_NAME() : IToken { return this.leftIToken; }

    constructor(token : IToken ) { super(token); this.initialize(); }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            v.visitalias_rhs1(this);
            v.endVisitalias_rhs1(this);
        }
    }

    /**
     *<b>
    *<li>Rule 49:  alias_rhs ::= ERROR_KEY
     *</b>
     */
    export class alias_rhs2 extends ASTNodeToken implements Ialias_rhs
    {
        public  getERROR_KEY() : IToken { return this.leftIToken; }

    constructor(token : IToken ) { super(token); this.initialize(); }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            v.visitalias_rhs2(this);
            v.endVisitalias_rhs2(this);
        }
    }

    /**
     *<b>
    *<li>Rule 50:  alias_rhs ::= EOL_KEY
     *</b>
     */
    export class alias_rhs3 extends ASTNodeToken implements Ialias_rhs
    {
        public  getEOL_KEY() : IToken { return this.leftIToken; }

    constructor(token : IToken ) { super(token); this.initialize(); }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            v.visitalias_rhs3(this);
            v.endVisitalias_rhs3(this);
        }
    }

    /**
     *<b>
    *<li>Rule 51:  alias_rhs ::= EOF_KEY
     *</b>
     */
    export class alias_rhs4 extends ASTNodeToken implements Ialias_rhs
    {
        public  getEOF_KEY() : IToken { return this.leftIToken; }

    constructor(token : IToken ) { super(token); this.initialize(); }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            v.visitalias_rhs4(this);
            v.endVisitalias_rhs4(this);
        }
    }

    /**
     *<b>
    *<li>Rule 52:  alias_rhs ::= EMPTY_KEY
     *</b>
     */
    export class alias_rhs5 extends ASTNodeToken implements Ialias_rhs
    {
        public  getEMPTY_KEY() : IToken { return this.leftIToken; }

    constructor(token : IToken ) { super(token); this.initialize(); }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            v.visitalias_rhs5(this);
            v.endVisitalias_rhs5(this);
        }
    }

    /**
     *<b>
    *<li>Rule 53:  alias_rhs ::= IDENTIFIER_KEY
     *</b>
     */
    export class alias_rhs6 extends ASTNodeToken implements Ialias_rhs
    {
        public  getIDENTIFIER_KEY() : IToken { return this.leftIToken; }

    constructor(token : IToken ) { super(token); this.initialize(); }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            v.visitalias_rhs6(this);
            v.endVisitalias_rhs6(this);
        }
    }

    /**
     *<b>
    *<li>Rule 58:  macro_name_symbol ::= MACRO_NAME
     *</b>
     */
    export class macro_name_symbol0 extends ASTNodeToken implements Imacro_name_symbol
    {
        public  getMACRO_NAME() : IToken { return this.leftIToken; }

    constructor(token : IToken ) { super(token); this.initialize(); }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            v.visitmacro_name_symbol0(this);
            v.endVisitmacro_name_symbol0(this);
        }
    }

    /**
     *<b>
    *<li>Rule 59:  macro_name_symbol ::= SYMBOL
     *</b>
     */
    export class macro_name_symbol1 extends ASTNodeToken implements Imacro_name_symbol
    {
        public  getSYMBOL() : IToken { return this.leftIToken; }

    constructor(token : IToken ) { super(token); this.initialize(); }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            v.visitmacro_name_symbol1(this);
            v.endVisitmacro_name_symbol1(this);
        }
    }

    /**
     *<b>
    *<li>Rule 73:  drop_command ::= DROPSYMBOLS_KEY drop_symbols
     *</b>
     */
    export class drop_command0 extends ASTNode implements Idrop_command
    {
        private  _DROPSYMBOLS_KEY : ASTNodeToken;
        private  _drop_symbols : SYMBOLList;

        public  getDROPSYMBOLS_KEY() : ASTNodeToken{ return this._DROPSYMBOLS_KEY; }
        public  setDROPSYMBOLS_KEY( _DROPSYMBOLS_KEY : ASTNodeToken) : void { this._DROPSYMBOLS_KEY = _DROPSYMBOLS_KEY; }
        public  getdrop_symbols() : SYMBOLList{ return this._drop_symbols; }
        public  setdrop_symbols( _drop_symbols : SYMBOLList) : void { this._drop_symbols = _drop_symbols; }

        constructor(leftIToken : IToken , rightIToken : IToken ,
                     _DROPSYMBOLS_KEY : ASTNodeToken,
                     _drop_symbols : SYMBOLList)
        {
            super(leftIToken, rightIToken)

            this._DROPSYMBOLS_KEY = _DROPSYMBOLS_KEY;
            (<ASTNode> _DROPSYMBOLS_KEY).setParent(this);
            this._drop_symbols = _drop_symbols;
            (<ASTNode> _drop_symbols).setParent(this);
            this.initialize();
        }

        /**
         * A list of all children of this node, don't including the null ones.
         */
         public   getAllChildren() : Lpg.Util.ArrayList<IAst>
        {
            let list = new Lpg.Util.ArrayList<IAst>();
            if(this._DROPSYMBOLS_KEY)  list.add(this._DROPSYMBOLS_KEY);
            if(this._drop_symbols)  list.add(this._drop_symbols);
            return list;
        }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            let checkChildren = v.visitdrop_command0(this);
            if (checkChildren)
            {
                this._DROPSYMBOLS_KEY.accept(v);
                this._drop_symbols.accept(v);
            }
            v.endVisitdrop_command0(this);
        }
    }

    /**
     *<b>
    *<li>Rule 74:  drop_command ::= DROPRULES_KEY drop_rules
     *</b>
     */
    export class drop_command1 extends ASTNode implements Idrop_command
    {
        private  _DROPRULES_KEY : ASTNodeToken;
        private  _drop_rules : drop_ruleList;

        public  getDROPRULES_KEY() : ASTNodeToken{ return this._DROPRULES_KEY; }
        public  setDROPRULES_KEY( _DROPRULES_KEY : ASTNodeToken) : void { this._DROPRULES_KEY = _DROPRULES_KEY; }
        public  getdrop_rules() : drop_ruleList{ return this._drop_rules; }
        public  setdrop_rules( _drop_rules : drop_ruleList) : void { this._drop_rules = _drop_rules; }

        constructor(leftIToken : IToken , rightIToken : IToken ,
                     _DROPRULES_KEY : ASTNodeToken,
                     _drop_rules : drop_ruleList)
        {
            super(leftIToken, rightIToken)

            this._DROPRULES_KEY = _DROPRULES_KEY;
            (<ASTNode> _DROPRULES_KEY).setParent(this);
            this._drop_rules = _drop_rules;
            (<ASTNode> _drop_rules).setParent(this);
            this.initialize();
        }

        /**
         * A list of all children of this node, don't including the null ones.
         */
         public   getAllChildren() : Lpg.Util.ArrayList<IAst>
        {
            let list = new Lpg.Util.ArrayList<IAst>();
            if(this._DROPRULES_KEY)  list.add(this._DROPRULES_KEY);
            if(this._drop_rules)  list.add(this._drop_rules);
            return list;
        }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            let checkChildren = v.visitdrop_command1(this);
            if (checkChildren)
            {
                this._DROPRULES_KEY.accept(v);
                this._drop_rules.accept(v);
            }
            v.endVisitdrop_command1(this);
        }
    }

    /**
     *<b>
    *<li>Rule 90:  name ::= SYMBOL
     *</b>
     */
    export class name0 extends ASTNodeToken implements Iname
    {
        public  getSYMBOL() : IToken { return this.leftIToken; }

    constructor(token : IToken ) { super(token); this.initialize(); }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            v.visitname0(this);
            v.endVisitname0(this);
        }
    }

    /**
     *<b>
    *<li>Rule 91:  name ::= MACRO_NAME
     *</b>
     */
    export class name1 extends ASTNodeToken implements Iname
    {
        public  getMACRO_NAME() : IToken { return this.leftIToken; }

    constructor(token : IToken ) { super(token); this.initialize(); }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            v.visitname1(this);
            v.endVisitname1(this);
        }
    }

    /**
     *<b>
    *<li>Rule 92:  name ::= EMPTY_KEY
     *</b>
     */
    export class name2 extends ASTNodeToken implements Iname
    {
        public  getEMPTY_KEY() : IToken { return this.leftIToken; }

    constructor(token : IToken ) { super(token); this.initialize(); }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            v.visitname2(this);
            v.endVisitname2(this);
        }
    }

    /**
     *<b>
    *<li>Rule 93:  name ::= ERROR_KEY
     *</b>
     */
    export class name3 extends ASTNodeToken implements Iname
    {
        public  getERROR_KEY() : IToken { return this.leftIToken; }

    constructor(token : IToken ) { super(token); this.initialize(); }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            v.visitname3(this);
            v.endVisitname3(this);
        }
    }

    /**
     *<b>
    *<li>Rule 94:  name ::= EOL_KEY
     *</b>
     */
    export class name4 extends ASTNodeToken implements Iname
    {
        public  getEOL_KEY() : IToken { return this.leftIToken; }

    constructor(token : IToken ) { super(token); this.initialize(); }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            v.visitname4(this);
            v.endVisitname4(this);
        }
    }

    /**
     *<b>
    *<li>Rule 95:  name ::= IDENTIFIER_KEY
     *</b>
     */
    export class name5 extends ASTNodeToken implements Iname
    {
        public  getIDENTIFIER_KEY() : IToken { return this.leftIToken; }

    constructor(token : IToken ) { super(token); this.initialize(); }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            v.visitname5(this);
            v.endVisitname5(this);
        }
    }

    /**
     *<b>
    *<li>Rule 107:  produces ::= ::=
     *</b>
     */
    export class produces0 extends ASTNodeToken implements Iproduces
    {
        public  getEQUIVALENCE() : IToken { return this.leftIToken; }

    constructor(token : IToken ) { super(token); this.initialize(); }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            v.visitproduces0(this);
            v.endVisitproduces0(this);
        }
    }

    /**
     *<b>
    *<li>Rule 108:  produces ::= ::=?
     *</b>
     */
    export class produces1 extends ASTNodeToken implements Iproduces
    {
        public  getPRIORITY_EQUIVALENCE() : IToken { return this.leftIToken; }

    constructor(token : IToken ) { super(token); this.initialize(); }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            v.visitproduces1(this);
            v.endVisitproduces1(this);
        }
    }

    /**
     *<b>
    *<li>Rule 109:  produces ::= ->
     *</b>
     */
    export class produces2 extends ASTNodeToken implements Iproduces
    {
        public  getARROW() : IToken { return this.leftIToken; }

    constructor(token : IToken ) { super(token); this.initialize(); }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            v.visitproduces2(this);
            v.endVisitproduces2(this);
        }
    }

    /**
     *<b>
    *<li>Rule 110:  produces ::= ->?
     *</b>
     */
    export class produces3 extends ASTNodeToken implements Iproduces
    {
        public  getPRIORITY_ARROW() : IToken { return this.leftIToken; }

    constructor(token : IToken ) { super(token); this.initialize(); }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            v.visitproduces3(this);
            v.endVisitproduces3(this);
        }
    }

    /**
     *<b>
    *<li>Rule 114:  symWithAttrs ::= EMPTY_KEY
     *</b>
     */
    export class symWithAttrs0 extends ASTNodeToken implements IsymWithAttrs
    {
        public  getEMPTY_KEY() : IToken { return this.leftIToken; }

    constructor(token : IToken ) { super(token); this.initialize(); }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            v.visitsymWithAttrs0(this);
            v.endVisitsymWithAttrs0(this);
        }
    }

    /**
     *<b>
    *<li>Rule 115:  symWithAttrs ::= SYMBOL optAttrList
     *</b>
     */
    export class symWithAttrs1 extends ASTNode implements IsymWithAttrs
    {
        private  _SYMBOL : ASTNodeToken;
        private  _optAttrList : symAttrs| null;

        public  getSYMBOL() : ASTNodeToken{ return this._SYMBOL; }
        public  setSYMBOL( _SYMBOL : ASTNodeToken) : void { this._SYMBOL = _SYMBOL; }
        /**
         * The value returned by <b>getoptAttrList</b> may be <b>null</b>
         */
        public  getoptAttrList() : symAttrs | null { return this._optAttrList; }
        public  setoptAttrList( _optAttrList : symAttrs) : void { this._optAttrList = _optAttrList; }

        constructor(leftIToken : IToken , rightIToken : IToken ,
                     _SYMBOL : ASTNodeToken,
                     _optAttrList : symAttrs| null)
        {
            super(leftIToken, rightIToken)

            this._SYMBOL = _SYMBOL;
            (<ASTNode> _SYMBOL).setParent(this);
            this._optAttrList = _optAttrList;
            if (_optAttrList) (<ASTNode> _optAttrList).setParent(this);
            this.initialize();
        }

        /**
         * A list of all children of this node, don't including the null ones.
         */
         public   getAllChildren() : Lpg.Util.ArrayList<IAst>
        {
            let list = new Lpg.Util.ArrayList<IAst>();
            if(this._SYMBOL)  list.add(this._SYMBOL);
            if(this._optAttrList)  list.add(this._optAttrList);
            return list;
        }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            let checkChildren = v.visitsymWithAttrs1(this);
            if (checkChildren)
            {
                this._SYMBOL.accept(v);
                if (this._optAttrList) this._optAttrList.accept(v);
            }
            v.endVisitsymWithAttrs1(this);
        }
    }

    /**
     *<b>
    *<li>Rule 123:  start_symbol ::= SYMBOL
     *</b>
     */
    export class start_symbol0 extends ASTNodeToken implements Istart_symbol
    {
        public  getSYMBOL() : IToken { return this.leftIToken; }

    constructor(token : IToken ) { super(token); this.initialize(); }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            v.visitstart_symbol0(this);
            v.endVisitstart_symbol0(this);
        }
    }

    /**
     *<b>
    *<li>Rule 124:  start_symbol ::= MACRO_NAME
     *</b>
     */
    export class start_symbol1 extends ASTNodeToken implements Istart_symbol
    {
        public  getMACRO_NAME() : IToken { return this.leftIToken; }

    constructor(token : IToken ) { super(token); this.initialize(); }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            v.visitstart_symbol1(this);
            v.endVisitstart_symbol1(this);
        }
    }

    /**
     *<b>
    *<li>Rule 130:  terminal_symbol ::= SYMBOL
     *</b>
     */
    export class terminal_symbol0 extends ASTNodeToken implements Iterminal_symbol
    {
        public  getSYMBOL() : IToken { return this.leftIToken; }

    constructor(token : IToken ) { super(token); this.initialize(); }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            v.visitterminal_symbol0(this);
            v.endVisitterminal_symbol0(this);
        }
    }

    /**
     *<b>
    *<li>Rule 131:  terminal_symbol ::= MACRO_NAME
     *</b>
     */
    export class terminal_symbol1 extends ASTNodeToken implements Iterminal_symbol
    {
        public  getMACRO_NAME() : IToken { return this.leftIToken; }

    constructor(token : IToken ) { super(token); this.initialize(); }

        public   accept(v : IAstVisitor ) : void
        {
            if (! v.preVisit(this)) return;
            this.enter(<Visitor> v);
            v.postVisit(this);
        }

        public   enter(v : Visitor) : void
        {
            v.visitterminal_symbol1(this);
            v.endVisitterminal_symbol1(this);
        }
    }

    export interface Visitor extends IAstVisitor
    {
        visit(n : ASTNode) : boolean;
        endVisit(n : ASTNode) : void;

        visitASTNodeToken(n : ASTNodeToken) : boolean;
        endVisitASTNodeToken(n : ASTNodeToken) : void;

        visitLPG(n : LPG) : boolean;
        endVisitLPG(n : LPG) : void;

        visitLPG_itemList(n : LPG_itemList) : boolean;
        endVisitLPG_itemList(n : LPG_itemList) : void;

        visitAliasSeg(n : AliasSeg) : boolean;
        endVisitAliasSeg(n : AliasSeg) : void;

        visitAstSeg(n : AstSeg) : boolean;
        endVisitAstSeg(n : AstSeg) : void;

        visitDefineSeg(n : DefineSeg) : boolean;
        endVisitDefineSeg(n : DefineSeg) : void;

        visitEofSeg(n : EofSeg) : boolean;
        endVisitEofSeg(n : EofSeg) : void;

        visitEolSeg(n : EolSeg) : boolean;
        endVisitEolSeg(n : EolSeg) : void;

        visitErrorSeg(n : ErrorSeg) : boolean;
        endVisitErrorSeg(n : ErrorSeg) : void;

        visitExportSeg(n : ExportSeg) : boolean;
        endVisitExportSeg(n : ExportSeg) : void;

        visitGlobalsSeg(n : GlobalsSeg) : boolean;
        endVisitGlobalsSeg(n : GlobalsSeg) : void;

        visitHeadersSeg(n : HeadersSeg) : boolean;
        endVisitHeadersSeg(n : HeadersSeg) : void;

        visitIdentifierSeg(n : IdentifierSeg) : boolean;
        endVisitIdentifierSeg(n : IdentifierSeg) : void;

        visitImportSeg(n : ImportSeg) : boolean;
        endVisitImportSeg(n : ImportSeg) : void;

        visitIncludeSeg(n : IncludeSeg) : boolean;
        endVisitIncludeSeg(n : IncludeSeg) : void;

        visitKeywordsSeg(n : KeywordsSeg) : boolean;
        endVisitKeywordsSeg(n : KeywordsSeg) : void;

        visitNamesSeg(n : NamesSeg) : boolean;
        endVisitNamesSeg(n : NamesSeg) : void;

        visitNoticeSeg(n : NoticeSeg) : boolean;
        endVisitNoticeSeg(n : NoticeSeg) : void;

        visitRulesSeg(n : RulesSeg) : boolean;
        endVisitRulesSeg(n : RulesSeg) : void;

        visitSoftKeywordsSeg(n : SoftKeywordsSeg) : boolean;
        endVisitSoftKeywordsSeg(n : SoftKeywordsSeg) : void;

        visitStartSeg(n : StartSeg) : boolean;
        endVisitStartSeg(n : StartSeg) : void;

        visitTerminalsSeg(n : TerminalsSeg) : boolean;
        endVisitTerminalsSeg(n : TerminalsSeg) : void;

        visitTrailersSeg(n : TrailersSeg) : boolean;
        endVisitTrailersSeg(n : TrailersSeg) : void;

        visitTypesSeg(n : TypesSeg) : boolean;
        endVisitTypesSeg(n : TypesSeg) : void;

        visitRecoverSeg(n : RecoverSeg) : boolean;
        endVisitRecoverSeg(n : RecoverSeg) : void;

        visitPredecessorSeg(n : PredecessorSeg) : boolean;
        endVisitPredecessorSeg(n : PredecessorSeg) : void;

        visitoption_specList(n : option_specList) : boolean;
        endVisitoption_specList(n : option_specList) : void;

        visitoption_spec(n : option_spec) : boolean;
        endVisitoption_spec(n : option_spec) : void;

        visitoptionList(n : optionList) : boolean;
        endVisitoptionList(n : optionList) : void;

        visitoption(n : option) : boolean;
        endVisitoption(n : option) : void;

        visitSYMBOLList(n : SYMBOLList) : boolean;
        endVisitSYMBOLList(n : SYMBOLList) : void;

        visitaliasSpecList(n : aliasSpecList) : boolean;
        endVisitaliasSpecList(n : aliasSpecList) : void;

        visitalias_lhs_macro_name(n : alias_lhs_macro_name) : boolean;
        endVisitalias_lhs_macro_name(n : alias_lhs_macro_name) : void;

        visitdefineSpecList(n : defineSpecList) : boolean;
        endVisitdefineSpecList(n : defineSpecList) : void;

        visitdefineSpec(n : defineSpec) : boolean;
        endVisitdefineSpec(n : defineSpec) : void;

        visitmacro_segment(n : macro_segment) : boolean;
        endVisitmacro_segment(n : macro_segment) : void;

        visitterminal_symbolList(n : terminal_symbolList) : boolean;
        endVisitterminal_symbolList(n : terminal_symbolList) : void;

        visitaction_segmentList(n : action_segmentList) : boolean;
        endVisitaction_segmentList(n : action_segmentList) : void;

        visitimport_segment(n : import_segment) : boolean;
        endVisitimport_segment(n : import_segment) : void;

        visitdrop_commandList(n : drop_commandList) : boolean;
        endVisitdrop_commandList(n : drop_commandList) : void;

        visitdrop_ruleList(n : drop_ruleList) : boolean;
        endVisitdrop_ruleList(n : drop_ruleList) : void;

        visitdrop_rule(n : drop_rule) : boolean;
        endVisitdrop_rule(n : drop_rule) : void;

        visitoptMacroName(n : optMacroName) : boolean;
        endVisitoptMacroName(n : optMacroName) : void;

        visitinclude_segment(n : include_segment) : boolean;
        endVisitinclude_segment(n : include_segment) : void;

        visitkeywordSpecList(n : keywordSpecList) : boolean;
        endVisitkeywordSpecList(n : keywordSpecList) : void;

        visitkeywordSpec(n : keywordSpec) : boolean;
        endVisitkeywordSpec(n : keywordSpec) : void;

        visitnameSpecList(n : nameSpecList) : boolean;
        endVisitnameSpecList(n : nameSpecList) : void;

        visitnameSpec(n : nameSpec) : boolean;
        endVisitnameSpec(n : nameSpec) : void;

        visitrules_segment(n : rules_segment) : boolean;
        endVisitrules_segment(n : rules_segment) : void;

        visitnonTermList(n : nonTermList) : boolean;
        endVisitnonTermList(n : nonTermList) : void;

        visitnonTerm(n : nonTerm) : boolean;
        endVisitnonTerm(n : nonTerm) : void;

        visitRuleName(n : RuleName) : boolean;
        endVisitRuleName(n : RuleName) : void;

        visitruleList(n : ruleList) : boolean;
        endVisitruleList(n : ruleList) : void;

        visitrule(n : rule) : boolean;
        endVisitrule(n : rule) : void;

        visitsymWithAttrsList(n : symWithAttrsList) : boolean;
        endVisitsymWithAttrsList(n : symWithAttrsList) : void;

        visitsymAttrs(n : symAttrs) : boolean;
        endVisitsymAttrs(n : symAttrs) : void;

        visitaction_segment(n : action_segment) : boolean;
        endVisitaction_segment(n : action_segment) : void;

        visitstart_symbolList(n : start_symbolList) : boolean;
        endVisitstart_symbolList(n : start_symbolList) : void;

        visitterminals_segment_terminalList(n : terminals_segment_terminalList) : boolean;
        endVisitterminals_segment_terminalList(n : terminals_segment_terminalList) : void;

        visitterminalList(n : terminalList) : boolean;
        endVisitterminalList(n : terminalList) : void;

        visitterminal(n : terminal) : boolean;
        endVisitterminal(n : terminal) : void;

        visitoptTerminalAlias(n : optTerminalAlias) : boolean;
        endVisitoptTerminalAlias(n : optTerminalAlias) : void;

        visittype_declarationsList(n : type_declarationsList) : boolean;
        endVisittype_declarationsList(n : type_declarationsList) : void;

        visittype_declarations(n : type_declarations) : boolean;
        endVisittype_declarations(n : type_declarations) : void;

        visitsymbol_pairList(n : symbol_pairList) : boolean;
        endVisitsymbol_pairList(n : symbol_pairList) : void;

        visitsymbol_pair(n : symbol_pair) : boolean;
        endVisitsymbol_pair(n : symbol_pair) : void;

        visitrecover_symbol(n : recover_symbol) : boolean;
        endVisitrecover_symbol(n : recover_symbol) : void;

        visitEND_KEY_OPT(n : END_KEY_OPT) : boolean;
        endVisitEND_KEY_OPT(n : END_KEY_OPT) : void;

        visitoption_value0(n : option_value0) : boolean;
        endVisitoption_value0(n : option_value0) : void;

        visitoption_value1(n : option_value1) : boolean;
        endVisitoption_value1(n : option_value1) : void;

        visitaliasSpec0(n : aliasSpec0) : boolean;
        endVisitaliasSpec0(n : aliasSpec0) : void;

        visitaliasSpec1(n : aliasSpec1) : boolean;
        endVisitaliasSpec1(n : aliasSpec1) : void;

        visitaliasSpec2(n : aliasSpec2) : boolean;
        endVisitaliasSpec2(n : aliasSpec2) : void;

        visitaliasSpec3(n : aliasSpec3) : boolean;
        endVisitaliasSpec3(n : aliasSpec3) : void;

        visitaliasSpec4(n : aliasSpec4) : boolean;
        endVisitaliasSpec4(n : aliasSpec4) : void;

        visitaliasSpec5(n : aliasSpec5) : boolean;
        endVisitaliasSpec5(n : aliasSpec5) : void;

        visitalias_rhs0(n : alias_rhs0) : boolean;
        endVisitalias_rhs0(n : alias_rhs0) : void;

        visitalias_rhs1(n : alias_rhs1) : boolean;
        endVisitalias_rhs1(n : alias_rhs1) : void;

        visitalias_rhs2(n : alias_rhs2) : boolean;
        endVisitalias_rhs2(n : alias_rhs2) : void;

        visitalias_rhs3(n : alias_rhs3) : boolean;
        endVisitalias_rhs3(n : alias_rhs3) : void;

        visitalias_rhs4(n : alias_rhs4) : boolean;
        endVisitalias_rhs4(n : alias_rhs4) : void;

        visitalias_rhs5(n : alias_rhs5) : boolean;
        endVisitalias_rhs5(n : alias_rhs5) : void;

        visitalias_rhs6(n : alias_rhs6) : boolean;
        endVisitalias_rhs6(n : alias_rhs6) : void;

        visitmacro_name_symbol0(n : macro_name_symbol0) : boolean;
        endVisitmacro_name_symbol0(n : macro_name_symbol0) : void;

        visitmacro_name_symbol1(n : macro_name_symbol1) : boolean;
        endVisitmacro_name_symbol1(n : macro_name_symbol1) : void;

        visitdrop_command0(n : drop_command0) : boolean;
        endVisitdrop_command0(n : drop_command0) : void;

        visitdrop_command1(n : drop_command1) : boolean;
        endVisitdrop_command1(n : drop_command1) : void;

        visitname0(n : name0) : boolean;
        endVisitname0(n : name0) : void;

        visitname1(n : name1) : boolean;
        endVisitname1(n : name1) : void;

        visitname2(n : name2) : boolean;
        endVisitname2(n : name2) : void;

        visitname3(n : name3) : boolean;
        endVisitname3(n : name3) : void;

        visitname4(n : name4) : boolean;
        endVisitname4(n : name4) : void;

        visitname5(n : name5) : boolean;
        endVisitname5(n : name5) : void;

        visitproduces0(n : produces0) : boolean;
        endVisitproduces0(n : produces0) : void;

        visitproduces1(n : produces1) : boolean;
        endVisitproduces1(n : produces1) : void;

        visitproduces2(n : produces2) : boolean;
        endVisitproduces2(n : produces2) : void;

        visitproduces3(n : produces3) : boolean;
        endVisitproduces3(n : produces3) : void;

        visitsymWithAttrs0(n : symWithAttrs0) : boolean;
        endVisitsymWithAttrs0(n : symWithAttrs0) : void;

        visitsymWithAttrs1(n : symWithAttrs1) : boolean;
        endVisitsymWithAttrs1(n : symWithAttrs1) : void;

        visitstart_symbol0(n : start_symbol0) : boolean;
        endVisitstart_symbol0(n : start_symbol0) : void;

        visitstart_symbol1(n : start_symbol1) : boolean;
        endVisitstart_symbol1(n : start_symbol1) : void;

        visitterminal_symbol0(n : terminal_symbol0) : boolean;
        endVisitterminal_symbol0(n : terminal_symbol0) : void;

        visitterminal_symbol1(n : terminal_symbol1) : boolean;
        endVisitterminal_symbol1(n : terminal_symbol1) : void;

    }

    export abstract class AbstractVisitor implements Visitor
    {
        public abstract unimplementedVisitor(s : string) : void;

        public preVisit(element : IAst) : boolean{ return true; }

        public postVisit(element : IAst) : void{}

        public visitASTNodeToken(n : ASTNodeToken) : boolean{ this.unimplementedVisitor("visit(ASTNodeToken)"); return true; }
        public endVisitASTNodeToken(n : ASTNodeToken) : void{ this.unimplementedVisitor("endVisit(ASTNodeToken)"); }

        public visitLPG(n : LPG) : boolean{ this.unimplementedVisitor("visit(LPG)"); return true; }
        public endVisitLPG(n : LPG) : void{ this.unimplementedVisitor("endVisit(LPG)"); }

        public visitLPG_itemList(n : LPG_itemList) : boolean{ this.unimplementedVisitor("visit(LPG_itemList)"); return true; }
        public endVisitLPG_itemList(n : LPG_itemList) : void{ this.unimplementedVisitor("endVisit(LPG_itemList)"); }

        public visitAliasSeg(n : AliasSeg) : boolean{ this.unimplementedVisitor("visit(AliasSeg)"); return true; }
        public endVisitAliasSeg(n : AliasSeg) : void{ this.unimplementedVisitor("endVisit(AliasSeg)"); }

        public visitAstSeg(n : AstSeg) : boolean{ this.unimplementedVisitor("visit(AstSeg)"); return true; }
        public endVisitAstSeg(n : AstSeg) : void{ this.unimplementedVisitor("endVisit(AstSeg)"); }

        public visitDefineSeg(n : DefineSeg) : boolean{ this.unimplementedVisitor("visit(DefineSeg)"); return true; }
        public endVisitDefineSeg(n : DefineSeg) : void{ this.unimplementedVisitor("endVisit(DefineSeg)"); }

        public visitEofSeg(n : EofSeg) : boolean{ this.unimplementedVisitor("visit(EofSeg)"); return true; }
        public endVisitEofSeg(n : EofSeg) : void{ this.unimplementedVisitor("endVisit(EofSeg)"); }

        public visitEolSeg(n : EolSeg) : boolean{ this.unimplementedVisitor("visit(EolSeg)"); return true; }
        public endVisitEolSeg(n : EolSeg) : void{ this.unimplementedVisitor("endVisit(EolSeg)"); }

        public visitErrorSeg(n : ErrorSeg) : boolean{ this.unimplementedVisitor("visit(ErrorSeg)"); return true; }
        public endVisitErrorSeg(n : ErrorSeg) : void{ this.unimplementedVisitor("endVisit(ErrorSeg)"); }

        public visitExportSeg(n : ExportSeg) : boolean{ this.unimplementedVisitor("visit(ExportSeg)"); return true; }
        public endVisitExportSeg(n : ExportSeg) : void{ this.unimplementedVisitor("endVisit(ExportSeg)"); }

        public visitGlobalsSeg(n : GlobalsSeg) : boolean{ this.unimplementedVisitor("visit(GlobalsSeg)"); return true; }
        public endVisitGlobalsSeg(n : GlobalsSeg) : void{ this.unimplementedVisitor("endVisit(GlobalsSeg)"); }

        public visitHeadersSeg(n : HeadersSeg) : boolean{ this.unimplementedVisitor("visit(HeadersSeg)"); return true; }
        public endVisitHeadersSeg(n : HeadersSeg) : void{ this.unimplementedVisitor("endVisit(HeadersSeg)"); }

        public visitIdentifierSeg(n : IdentifierSeg) : boolean{ this.unimplementedVisitor("visit(IdentifierSeg)"); return true; }
        public endVisitIdentifierSeg(n : IdentifierSeg) : void{ this.unimplementedVisitor("endVisit(IdentifierSeg)"); }

        public visitImportSeg(n : ImportSeg) : boolean{ this.unimplementedVisitor("visit(ImportSeg)"); return true; }
        public endVisitImportSeg(n : ImportSeg) : void{ this.unimplementedVisitor("endVisit(ImportSeg)"); }

        public visitIncludeSeg(n : IncludeSeg) : boolean{ this.unimplementedVisitor("visit(IncludeSeg)"); return true; }
        public endVisitIncludeSeg(n : IncludeSeg) : void{ this.unimplementedVisitor("endVisit(IncludeSeg)"); }

        public visitKeywordsSeg(n : KeywordsSeg) : boolean{ this.unimplementedVisitor("visit(KeywordsSeg)"); return true; }
        public endVisitKeywordsSeg(n : KeywordsSeg) : void{ this.unimplementedVisitor("endVisit(KeywordsSeg)"); }

        public visitNamesSeg(n : NamesSeg) : boolean{ this.unimplementedVisitor("visit(NamesSeg)"); return true; }
        public endVisitNamesSeg(n : NamesSeg) : void{ this.unimplementedVisitor("endVisit(NamesSeg)"); }

        public visitNoticeSeg(n : NoticeSeg) : boolean{ this.unimplementedVisitor("visit(NoticeSeg)"); return true; }
        public endVisitNoticeSeg(n : NoticeSeg) : void{ this.unimplementedVisitor("endVisit(NoticeSeg)"); }

        public visitRulesSeg(n : RulesSeg) : boolean{ this.unimplementedVisitor("visit(RulesSeg)"); return true; }
        public endVisitRulesSeg(n : RulesSeg) : void{ this.unimplementedVisitor("endVisit(RulesSeg)"); }

        public visitSoftKeywordsSeg(n : SoftKeywordsSeg) : boolean{ this.unimplementedVisitor("visit(SoftKeywordsSeg)"); return true; }
        public endVisitSoftKeywordsSeg(n : SoftKeywordsSeg) : void{ this.unimplementedVisitor("endVisit(SoftKeywordsSeg)"); }

        public visitStartSeg(n : StartSeg) : boolean{ this.unimplementedVisitor("visit(StartSeg)"); return true; }
        public endVisitStartSeg(n : StartSeg) : void{ this.unimplementedVisitor("endVisit(StartSeg)"); }

        public visitTerminalsSeg(n : TerminalsSeg) : boolean{ this.unimplementedVisitor("visit(TerminalsSeg)"); return true; }
        public endVisitTerminalsSeg(n : TerminalsSeg) : void{ this.unimplementedVisitor("endVisit(TerminalsSeg)"); }

        public visitTrailersSeg(n : TrailersSeg) : boolean{ this.unimplementedVisitor("visit(TrailersSeg)"); return true; }
        public endVisitTrailersSeg(n : TrailersSeg) : void{ this.unimplementedVisitor("endVisit(TrailersSeg)"); }

        public visitTypesSeg(n : TypesSeg) : boolean{ this.unimplementedVisitor("visit(TypesSeg)"); return true; }
        public endVisitTypesSeg(n : TypesSeg) : void{ this.unimplementedVisitor("endVisit(TypesSeg)"); }

        public visitRecoverSeg(n : RecoverSeg) : boolean{ this.unimplementedVisitor("visit(RecoverSeg)"); return true; }
        public endVisitRecoverSeg(n : RecoverSeg) : void{ this.unimplementedVisitor("endVisit(RecoverSeg)"); }

        public visitPredecessorSeg(n : PredecessorSeg) : boolean{ this.unimplementedVisitor("visit(PredecessorSeg)"); return true; }
        public endVisitPredecessorSeg(n : PredecessorSeg) : void{ this.unimplementedVisitor("endVisit(PredecessorSeg)"); }

        public visitoption_specList(n : option_specList) : boolean{ this.unimplementedVisitor("visit(option_specList)"); return true; }
        public endVisitoption_specList(n : option_specList) : void{ this.unimplementedVisitor("endVisit(option_specList)"); }

        public visitoption_spec(n : option_spec) : boolean{ this.unimplementedVisitor("visit(option_spec)"); return true; }
        public endVisitoption_spec(n : option_spec) : void{ this.unimplementedVisitor("endVisit(option_spec)"); }

        public visitoptionList(n : optionList) : boolean{ this.unimplementedVisitor("visit(optionList)"); return true; }
        public endVisitoptionList(n : optionList) : void{ this.unimplementedVisitor("endVisit(optionList)"); }

        public visitoption(n : option) : boolean{ this.unimplementedVisitor("visit(option)"); return true; }
        public endVisitoption(n : option) : void{ this.unimplementedVisitor("endVisit(option)"); }

        public visitSYMBOLList(n : SYMBOLList) : boolean{ this.unimplementedVisitor("visit(SYMBOLList)"); return true; }
        public endVisitSYMBOLList(n : SYMBOLList) : void{ this.unimplementedVisitor("endVisit(SYMBOLList)"); }

        public visitaliasSpecList(n : aliasSpecList) : boolean{ this.unimplementedVisitor("visit(aliasSpecList)"); return true; }
        public endVisitaliasSpecList(n : aliasSpecList) : void{ this.unimplementedVisitor("endVisit(aliasSpecList)"); }

        public visitalias_lhs_macro_name(n : alias_lhs_macro_name) : boolean{ this.unimplementedVisitor("visit(alias_lhs_macro_name)"); return true; }
        public endVisitalias_lhs_macro_name(n : alias_lhs_macro_name) : void{ this.unimplementedVisitor("endVisit(alias_lhs_macro_name)"); }

        public visitdefineSpecList(n : defineSpecList) : boolean{ this.unimplementedVisitor("visit(defineSpecList)"); return true; }
        public endVisitdefineSpecList(n : defineSpecList) : void{ this.unimplementedVisitor("endVisit(defineSpecList)"); }

        public visitdefineSpec(n : defineSpec) : boolean{ this.unimplementedVisitor("visit(defineSpec)"); return true; }
        public endVisitdefineSpec(n : defineSpec) : void{ this.unimplementedVisitor("endVisit(defineSpec)"); }

        public visitmacro_segment(n : macro_segment) : boolean{ this.unimplementedVisitor("visit(macro_segment)"); return true; }
        public endVisitmacro_segment(n : macro_segment) : void{ this.unimplementedVisitor("endVisit(macro_segment)"); }

        public visitterminal_symbolList(n : terminal_symbolList) : boolean{ this.unimplementedVisitor("visit(terminal_symbolList)"); return true; }
        public endVisitterminal_symbolList(n : terminal_symbolList) : void{ this.unimplementedVisitor("endVisit(terminal_symbolList)"); }

        public visitaction_segmentList(n : action_segmentList) : boolean{ this.unimplementedVisitor("visit(action_segmentList)"); return true; }
        public endVisitaction_segmentList(n : action_segmentList) : void{ this.unimplementedVisitor("endVisit(action_segmentList)"); }

        public visitimport_segment(n : import_segment) : boolean{ this.unimplementedVisitor("visit(import_segment)"); return true; }
        public endVisitimport_segment(n : import_segment) : void{ this.unimplementedVisitor("endVisit(import_segment)"); }

        public visitdrop_commandList(n : drop_commandList) : boolean{ this.unimplementedVisitor("visit(drop_commandList)"); return true; }
        public endVisitdrop_commandList(n : drop_commandList) : void{ this.unimplementedVisitor("endVisit(drop_commandList)"); }

        public visitdrop_ruleList(n : drop_ruleList) : boolean{ this.unimplementedVisitor("visit(drop_ruleList)"); return true; }
        public endVisitdrop_ruleList(n : drop_ruleList) : void{ this.unimplementedVisitor("endVisit(drop_ruleList)"); }

        public visitdrop_rule(n : drop_rule) : boolean{ this.unimplementedVisitor("visit(drop_rule)"); return true; }
        public endVisitdrop_rule(n : drop_rule) : void{ this.unimplementedVisitor("endVisit(drop_rule)"); }

        public visitoptMacroName(n : optMacroName) : boolean{ this.unimplementedVisitor("visit(optMacroName)"); return true; }
        public endVisitoptMacroName(n : optMacroName) : void{ this.unimplementedVisitor("endVisit(optMacroName)"); }

        public visitinclude_segment(n : include_segment) : boolean{ this.unimplementedVisitor("visit(include_segment)"); return true; }
        public endVisitinclude_segment(n : include_segment) : void{ this.unimplementedVisitor("endVisit(include_segment)"); }

        public visitkeywordSpecList(n : keywordSpecList) : boolean{ this.unimplementedVisitor("visit(keywordSpecList)"); return true; }
        public endVisitkeywordSpecList(n : keywordSpecList) : void{ this.unimplementedVisitor("endVisit(keywordSpecList)"); }

        public visitkeywordSpec(n : keywordSpec) : boolean{ this.unimplementedVisitor("visit(keywordSpec)"); return true; }
        public endVisitkeywordSpec(n : keywordSpec) : void{ this.unimplementedVisitor("endVisit(keywordSpec)"); }

        public visitnameSpecList(n : nameSpecList) : boolean{ this.unimplementedVisitor("visit(nameSpecList)"); return true; }
        public endVisitnameSpecList(n : nameSpecList) : void{ this.unimplementedVisitor("endVisit(nameSpecList)"); }

        public visitnameSpec(n : nameSpec) : boolean{ this.unimplementedVisitor("visit(nameSpec)"); return true; }
        public endVisitnameSpec(n : nameSpec) : void{ this.unimplementedVisitor("endVisit(nameSpec)"); }

        public visitrules_segment(n : rules_segment) : boolean{ this.unimplementedVisitor("visit(rules_segment)"); return true; }
        public endVisitrules_segment(n : rules_segment) : void{ this.unimplementedVisitor("endVisit(rules_segment)"); }

        public visitnonTermList(n : nonTermList) : boolean{ this.unimplementedVisitor("visit(nonTermList)"); return true; }
        public endVisitnonTermList(n : nonTermList) : void{ this.unimplementedVisitor("endVisit(nonTermList)"); }

        public visitnonTerm(n : nonTerm) : boolean{ this.unimplementedVisitor("visit(nonTerm)"); return true; }
        public endVisitnonTerm(n : nonTerm) : void{ this.unimplementedVisitor("endVisit(nonTerm)"); }

        public visitRuleName(n : RuleName) : boolean{ this.unimplementedVisitor("visit(RuleName)"); return true; }
        public endVisitRuleName(n : RuleName) : void{ this.unimplementedVisitor("endVisit(RuleName)"); }

        public visitruleList(n : ruleList) : boolean{ this.unimplementedVisitor("visit(ruleList)"); return true; }
        public endVisitruleList(n : ruleList) : void{ this.unimplementedVisitor("endVisit(ruleList)"); }

        public visitrule(n : rule) : boolean{ this.unimplementedVisitor("visit(rule)"); return true; }
        public endVisitrule(n : rule) : void{ this.unimplementedVisitor("endVisit(rule)"); }

        public visitsymWithAttrsList(n : symWithAttrsList) : boolean{ this.unimplementedVisitor("visit(symWithAttrsList)"); return true; }
        public endVisitsymWithAttrsList(n : symWithAttrsList) : void{ this.unimplementedVisitor("endVisit(symWithAttrsList)"); }

        public visitsymAttrs(n : symAttrs) : boolean{ this.unimplementedVisitor("visit(symAttrs)"); return true; }
        public endVisitsymAttrs(n : symAttrs) : void{ this.unimplementedVisitor("endVisit(symAttrs)"); }

        public visitaction_segment(n : action_segment) : boolean{ this.unimplementedVisitor("visit(action_segment)"); return true; }
        public endVisitaction_segment(n : action_segment) : void{ this.unimplementedVisitor("endVisit(action_segment)"); }

        public visitstart_symbolList(n : start_symbolList) : boolean{ this.unimplementedVisitor("visit(start_symbolList)"); return true; }
        public endVisitstart_symbolList(n : start_symbolList) : void{ this.unimplementedVisitor("endVisit(start_symbolList)"); }

        public visitterminals_segment_terminalList(n : terminals_segment_terminalList) : boolean{ this.unimplementedVisitor("visit(terminals_segment_terminalList)"); return true; }
        public endVisitterminals_segment_terminalList(n : terminals_segment_terminalList) : void{ this.unimplementedVisitor("endVisit(terminals_segment_terminalList)"); }

        public visitterminalList(n : terminalList) : boolean{ this.unimplementedVisitor("visit(terminalList)"); return true; }
        public endVisitterminalList(n : terminalList) : void{ this.unimplementedVisitor("endVisit(terminalList)"); }

        public visitterminal(n : terminal) : boolean{ this.unimplementedVisitor("visit(terminal)"); return true; }
        public endVisitterminal(n : terminal) : void{ this.unimplementedVisitor("endVisit(terminal)"); }

        public visitoptTerminalAlias(n : optTerminalAlias) : boolean{ this.unimplementedVisitor("visit(optTerminalAlias)"); return true; }
        public endVisitoptTerminalAlias(n : optTerminalAlias) : void{ this.unimplementedVisitor("endVisit(optTerminalAlias)"); }

        public visittype_declarationsList(n : type_declarationsList) : boolean{ this.unimplementedVisitor("visit(type_declarationsList)"); return true; }
        public endVisittype_declarationsList(n : type_declarationsList) : void{ this.unimplementedVisitor("endVisit(type_declarationsList)"); }

        public visittype_declarations(n : type_declarations) : boolean{ this.unimplementedVisitor("visit(type_declarations)"); return true; }
        public endVisittype_declarations(n : type_declarations) : void{ this.unimplementedVisitor("endVisit(type_declarations)"); }

        public visitsymbol_pairList(n : symbol_pairList) : boolean{ this.unimplementedVisitor("visit(symbol_pairList)"); return true; }
        public endVisitsymbol_pairList(n : symbol_pairList) : void{ this.unimplementedVisitor("endVisit(symbol_pairList)"); }

        public visitsymbol_pair(n : symbol_pair) : boolean{ this.unimplementedVisitor("visit(symbol_pair)"); return true; }
        public endVisitsymbol_pair(n : symbol_pair) : void{ this.unimplementedVisitor("endVisit(symbol_pair)"); }

        public visitrecover_symbol(n : recover_symbol) : boolean{ this.unimplementedVisitor("visit(recover_symbol)"); return true; }
        public endVisitrecover_symbol(n : recover_symbol) : void{ this.unimplementedVisitor("endVisit(recover_symbol)"); }

        public visitEND_KEY_OPT(n : END_KEY_OPT) : boolean{ this.unimplementedVisitor("visit(END_KEY_OPT)"); return true; }
        public endVisitEND_KEY_OPT(n : END_KEY_OPT) : void{ this.unimplementedVisitor("endVisit(END_KEY_OPT)"); }

        public visitoption_value0(n : option_value0) : boolean{ this.unimplementedVisitor("visit(option_value0)"); return true; }
        public endVisitoption_value0(n : option_value0) : void{ this.unimplementedVisitor("endVisit(option_value0)"); }

        public visitoption_value1(n : option_value1) : boolean{ this.unimplementedVisitor("visit(option_value1)"); return true; }
        public endVisitoption_value1(n : option_value1) : void{ this.unimplementedVisitor("endVisit(option_value1)"); }

        public visitaliasSpec0(n : aliasSpec0) : boolean{ this.unimplementedVisitor("visit(aliasSpec0)"); return true; }
        public endVisitaliasSpec0(n : aliasSpec0) : void{ this.unimplementedVisitor("endVisit(aliasSpec0)"); }

        public visitaliasSpec1(n : aliasSpec1) : boolean{ this.unimplementedVisitor("visit(aliasSpec1)"); return true; }
        public endVisitaliasSpec1(n : aliasSpec1) : void{ this.unimplementedVisitor("endVisit(aliasSpec1)"); }

        public visitaliasSpec2(n : aliasSpec2) : boolean{ this.unimplementedVisitor("visit(aliasSpec2)"); return true; }
        public endVisitaliasSpec2(n : aliasSpec2) : void{ this.unimplementedVisitor("endVisit(aliasSpec2)"); }

        public visitaliasSpec3(n : aliasSpec3) : boolean{ this.unimplementedVisitor("visit(aliasSpec3)"); return true; }
        public endVisitaliasSpec3(n : aliasSpec3) : void{ this.unimplementedVisitor("endVisit(aliasSpec3)"); }

        public visitaliasSpec4(n : aliasSpec4) : boolean{ this.unimplementedVisitor("visit(aliasSpec4)"); return true; }
        public endVisitaliasSpec4(n : aliasSpec4) : void{ this.unimplementedVisitor("endVisit(aliasSpec4)"); }

        public visitaliasSpec5(n : aliasSpec5) : boolean{ this.unimplementedVisitor("visit(aliasSpec5)"); return true; }
        public endVisitaliasSpec5(n : aliasSpec5) : void{ this.unimplementedVisitor("endVisit(aliasSpec5)"); }

        public visitalias_rhs0(n : alias_rhs0) : boolean{ this.unimplementedVisitor("visit(alias_rhs0)"); return true; }
        public endVisitalias_rhs0(n : alias_rhs0) : void{ this.unimplementedVisitor("endVisit(alias_rhs0)"); }

        public visitalias_rhs1(n : alias_rhs1) : boolean{ this.unimplementedVisitor("visit(alias_rhs1)"); return true; }
        public endVisitalias_rhs1(n : alias_rhs1) : void{ this.unimplementedVisitor("endVisit(alias_rhs1)"); }

        public visitalias_rhs2(n : alias_rhs2) : boolean{ this.unimplementedVisitor("visit(alias_rhs2)"); return true; }
        public endVisitalias_rhs2(n : alias_rhs2) : void{ this.unimplementedVisitor("endVisit(alias_rhs2)"); }

        public visitalias_rhs3(n : alias_rhs3) : boolean{ this.unimplementedVisitor("visit(alias_rhs3)"); return true; }
        public endVisitalias_rhs3(n : alias_rhs3) : void{ this.unimplementedVisitor("endVisit(alias_rhs3)"); }

        public visitalias_rhs4(n : alias_rhs4) : boolean{ this.unimplementedVisitor("visit(alias_rhs4)"); return true; }
        public endVisitalias_rhs4(n : alias_rhs4) : void{ this.unimplementedVisitor("endVisit(alias_rhs4)"); }

        public visitalias_rhs5(n : alias_rhs5) : boolean{ this.unimplementedVisitor("visit(alias_rhs5)"); return true; }
        public endVisitalias_rhs5(n : alias_rhs5) : void{ this.unimplementedVisitor("endVisit(alias_rhs5)"); }

        public visitalias_rhs6(n : alias_rhs6) : boolean{ this.unimplementedVisitor("visit(alias_rhs6)"); return true; }
        public endVisitalias_rhs6(n : alias_rhs6) : void{ this.unimplementedVisitor("endVisit(alias_rhs6)"); }

        public visitmacro_name_symbol0(n : macro_name_symbol0) : boolean{ this.unimplementedVisitor("visit(macro_name_symbol0)"); return true; }
        public endVisitmacro_name_symbol0(n : macro_name_symbol0) : void{ this.unimplementedVisitor("endVisit(macro_name_symbol0)"); }

        public visitmacro_name_symbol1(n : macro_name_symbol1) : boolean{ this.unimplementedVisitor("visit(macro_name_symbol1)"); return true; }
        public endVisitmacro_name_symbol1(n : macro_name_symbol1) : void{ this.unimplementedVisitor("endVisit(macro_name_symbol1)"); }

        public visitdrop_command0(n : drop_command0) : boolean{ this.unimplementedVisitor("visit(drop_command0)"); return true; }
        public endVisitdrop_command0(n : drop_command0) : void{ this.unimplementedVisitor("endVisit(drop_command0)"); }

        public visitdrop_command1(n : drop_command1) : boolean{ this.unimplementedVisitor("visit(drop_command1)"); return true; }
        public endVisitdrop_command1(n : drop_command1) : void{ this.unimplementedVisitor("endVisit(drop_command1)"); }

        public visitname0(n : name0) : boolean{ this.unimplementedVisitor("visit(name0)"); return true; }
        public endVisitname0(n : name0) : void{ this.unimplementedVisitor("endVisit(name0)"); }

        public visitname1(n : name1) : boolean{ this.unimplementedVisitor("visit(name1)"); return true; }
        public endVisitname1(n : name1) : void{ this.unimplementedVisitor("endVisit(name1)"); }

        public visitname2(n : name2) : boolean{ this.unimplementedVisitor("visit(name2)"); return true; }
        public endVisitname2(n : name2) : void{ this.unimplementedVisitor("endVisit(name2)"); }

        public visitname3(n : name3) : boolean{ this.unimplementedVisitor("visit(name3)"); return true; }
        public endVisitname3(n : name3) : void{ this.unimplementedVisitor("endVisit(name3)"); }

        public visitname4(n : name4) : boolean{ this.unimplementedVisitor("visit(name4)"); return true; }
        public endVisitname4(n : name4) : void{ this.unimplementedVisitor("endVisit(name4)"); }

        public visitname5(n : name5) : boolean{ this.unimplementedVisitor("visit(name5)"); return true; }
        public endVisitname5(n : name5) : void{ this.unimplementedVisitor("endVisit(name5)"); }

        public visitproduces0(n : produces0) : boolean{ this.unimplementedVisitor("visit(produces0)"); return true; }
        public endVisitproduces0(n : produces0) : void{ this.unimplementedVisitor("endVisit(produces0)"); }

        public visitproduces1(n : produces1) : boolean{ this.unimplementedVisitor("visit(produces1)"); return true; }
        public endVisitproduces1(n : produces1) : void{ this.unimplementedVisitor("endVisit(produces1)"); }

        public visitproduces2(n : produces2) : boolean{ this.unimplementedVisitor("visit(produces2)"); return true; }
        public endVisitproduces2(n : produces2) : void{ this.unimplementedVisitor("endVisit(produces2)"); }

        public visitproduces3(n : produces3) : boolean{ this.unimplementedVisitor("visit(produces3)"); return true; }
        public endVisitproduces3(n : produces3) : void{ this.unimplementedVisitor("endVisit(produces3)"); }

        public visitsymWithAttrs0(n : symWithAttrs0) : boolean{ this.unimplementedVisitor("visit(symWithAttrs0)"); return true; }
        public endVisitsymWithAttrs0(n : symWithAttrs0) : void{ this.unimplementedVisitor("endVisit(symWithAttrs0)"); }

        public visitsymWithAttrs1(n : symWithAttrs1) : boolean{ this.unimplementedVisitor("visit(symWithAttrs1)"); return true; }
        public endVisitsymWithAttrs1(n : symWithAttrs1) : void{ this.unimplementedVisitor("endVisit(symWithAttrs1)"); }

        public visitstart_symbol0(n : start_symbol0) : boolean{ this.unimplementedVisitor("visit(start_symbol0)"); return true; }
        public endVisitstart_symbol0(n : start_symbol0) : void{ this.unimplementedVisitor("endVisit(start_symbol0)"); }

        public visitstart_symbol1(n : start_symbol1) : boolean{ this.unimplementedVisitor("visit(start_symbol1)"); return true; }
        public endVisitstart_symbol1(n : start_symbol1) : void{ this.unimplementedVisitor("endVisit(start_symbol1)"); }

        public visitterminal_symbol0(n : terminal_symbol0) : boolean{ this.unimplementedVisitor("visit(terminal_symbol0)"); return true; }
        public endVisitterminal_symbol0(n : terminal_symbol0) : void{ this.unimplementedVisitor("endVisit(terminal_symbol0)"); }

        public visitterminal_symbol1(n : terminal_symbol1) : boolean{ this.unimplementedVisitor("visit(terminal_symbol1)"); return true; }
        public endVisitterminal_symbol1(n : terminal_symbol1) : void{ this.unimplementedVisitor("endVisit(terminal_symbol1)"); }


        public visit(n : ASTNode) : boolean
        {
            if (n instanceof ASTNodeToken) return this.visitASTNodeToken(<ASTNodeToken> n);
            else if (n instanceof LPG) return this.visitLPG(<LPG> n);
            else if (n instanceof LPG_itemList) return this.visitLPG_itemList(<LPG_itemList> n);
            else if (n instanceof AliasSeg) return this.visitAliasSeg(<AliasSeg> n);
            else if (n instanceof AstSeg) return this.visitAstSeg(<AstSeg> n);
            else if (n instanceof DefineSeg) return this.visitDefineSeg(<DefineSeg> n);
            else if (n instanceof EofSeg) return this.visitEofSeg(<EofSeg> n);
            else if (n instanceof EolSeg) return this.visitEolSeg(<EolSeg> n);
            else if (n instanceof ErrorSeg) return this.visitErrorSeg(<ErrorSeg> n);
            else if (n instanceof ExportSeg) return this.visitExportSeg(<ExportSeg> n);
            else if (n instanceof GlobalsSeg) return this.visitGlobalsSeg(<GlobalsSeg> n);
            else if (n instanceof HeadersSeg) return this.visitHeadersSeg(<HeadersSeg> n);
            else if (n instanceof IdentifierSeg) return this.visitIdentifierSeg(<IdentifierSeg> n);
            else if (n instanceof ImportSeg) return this.visitImportSeg(<ImportSeg> n);
            else if (n instanceof IncludeSeg) return this.visitIncludeSeg(<IncludeSeg> n);
            else if (n instanceof KeywordsSeg) return this.visitKeywordsSeg(<KeywordsSeg> n);
            else if (n instanceof NamesSeg) return this.visitNamesSeg(<NamesSeg> n);
            else if (n instanceof NoticeSeg) return this.visitNoticeSeg(<NoticeSeg> n);
            else if (n instanceof RulesSeg) return this.visitRulesSeg(<RulesSeg> n);
            else if (n instanceof SoftKeywordsSeg) return this.visitSoftKeywordsSeg(<SoftKeywordsSeg> n);
            else if (n instanceof StartSeg) return this.visitStartSeg(<StartSeg> n);
            else if (n instanceof TerminalsSeg) return this.visitTerminalsSeg(<TerminalsSeg> n);
            else if (n instanceof TrailersSeg) return this.visitTrailersSeg(<TrailersSeg> n);
            else if (n instanceof TypesSeg) return this.visitTypesSeg(<TypesSeg> n);
            else if (n instanceof RecoverSeg) return this.visitRecoverSeg(<RecoverSeg> n);
            else if (n instanceof PredecessorSeg) return this.visitPredecessorSeg(<PredecessorSeg> n);
            else if (n instanceof option_specList) return this.visitoption_specList(<option_specList> n);
            else if (n instanceof option_spec) return this.visitoption_spec(<option_spec> n);
            else if (n instanceof optionList) return this.visitoptionList(<optionList> n);
            else if (n instanceof option) return this.visitoption(<option> n);
            else if (n instanceof SYMBOLList) return this.visitSYMBOLList(<SYMBOLList> n);
            else if (n instanceof aliasSpecList) return this.visitaliasSpecList(<aliasSpecList> n);
            else if (n instanceof alias_lhs_macro_name) return this.visitalias_lhs_macro_name(<alias_lhs_macro_name> n);
            else if (n instanceof defineSpecList) return this.visitdefineSpecList(<defineSpecList> n);
            else if (n instanceof defineSpec) return this.visitdefineSpec(<defineSpec> n);
            else if (n instanceof macro_segment) return this.visitmacro_segment(<macro_segment> n);
            else if (n instanceof terminal_symbolList) return this.visitterminal_symbolList(<terminal_symbolList> n);
            else if (n instanceof action_segmentList) return this.visitaction_segmentList(<action_segmentList> n);
            else if (n instanceof import_segment) return this.visitimport_segment(<import_segment> n);
            else if (n instanceof drop_commandList) return this.visitdrop_commandList(<drop_commandList> n);
            else if (n instanceof drop_ruleList) return this.visitdrop_ruleList(<drop_ruleList> n);
            else if (n instanceof drop_rule) return this.visitdrop_rule(<drop_rule> n);
            else if (n instanceof optMacroName) return this.visitoptMacroName(<optMacroName> n);
            else if (n instanceof include_segment) return this.visitinclude_segment(<include_segment> n);
            else if (n instanceof keywordSpecList) return this.visitkeywordSpecList(<keywordSpecList> n);
            else if (n instanceof keywordSpec) return this.visitkeywordSpec(<keywordSpec> n);
            else if (n instanceof nameSpecList) return this.visitnameSpecList(<nameSpecList> n);
            else if (n instanceof nameSpec) return this.visitnameSpec(<nameSpec> n);
            else if (n instanceof rules_segment) return this.visitrules_segment(<rules_segment> n);
            else if (n instanceof nonTermList) return this.visitnonTermList(<nonTermList> n);
            else if (n instanceof nonTerm) return this.visitnonTerm(<nonTerm> n);
            else if (n instanceof RuleName) return this.visitRuleName(<RuleName> n);
            else if (n instanceof ruleList) return this.visitruleList(<ruleList> n);
            else if (n instanceof rule) return this.visitrule(<rule> n);
            else if (n instanceof symWithAttrsList) return this.visitsymWithAttrsList(<symWithAttrsList> n);
            else if (n instanceof symAttrs) return this.visitsymAttrs(<symAttrs> n);
            else if (n instanceof action_segment) return this.visitaction_segment(<action_segment> n);
            else if (n instanceof start_symbolList) return this.visitstart_symbolList(<start_symbolList> n);
            else if (n instanceof terminals_segment_terminalList) return this.visitterminals_segment_terminalList(<terminals_segment_terminalList> n);
            else if (n instanceof terminalList) return this.visitterminalList(<terminalList> n);
            else if (n instanceof terminal) return this.visitterminal(<terminal> n);
            else if (n instanceof optTerminalAlias) return this.visitoptTerminalAlias(<optTerminalAlias> n);
            else if (n instanceof type_declarationsList) return this.visittype_declarationsList(<type_declarationsList> n);
            else if (n instanceof type_declarations) return this.visittype_declarations(<type_declarations> n);
            else if (n instanceof symbol_pairList) return this.visitsymbol_pairList(<symbol_pairList> n);
            else if (n instanceof symbol_pair) return this.visitsymbol_pair(<symbol_pair> n);
            else if (n instanceof recover_symbol) return this.visitrecover_symbol(<recover_symbol> n);
            else if (n instanceof END_KEY_OPT) return this.visitEND_KEY_OPT(<END_KEY_OPT> n);
            else if (n instanceof option_value0) return this.visitoption_value0(<option_value0> n);
            else if (n instanceof option_value1) return this.visitoption_value1(<option_value1> n);
            else if (n instanceof aliasSpec0) return this.visitaliasSpec0(<aliasSpec0> n);
            else if (n instanceof aliasSpec1) return this.visitaliasSpec1(<aliasSpec1> n);
            else if (n instanceof aliasSpec2) return this.visitaliasSpec2(<aliasSpec2> n);
            else if (n instanceof aliasSpec3) return this.visitaliasSpec3(<aliasSpec3> n);
            else if (n instanceof aliasSpec4) return this.visitaliasSpec4(<aliasSpec4> n);
            else if (n instanceof aliasSpec5) return this.visitaliasSpec5(<aliasSpec5> n);
            else if (n instanceof alias_rhs0) return this.visitalias_rhs0(<alias_rhs0> n);
            else if (n instanceof alias_rhs1) return this.visitalias_rhs1(<alias_rhs1> n);
            else if (n instanceof alias_rhs2) return this.visitalias_rhs2(<alias_rhs2> n);
            else if (n instanceof alias_rhs3) return this.visitalias_rhs3(<alias_rhs3> n);
            else if (n instanceof alias_rhs4) return this.visitalias_rhs4(<alias_rhs4> n);
            else if (n instanceof alias_rhs5) return this.visitalias_rhs5(<alias_rhs5> n);
            else if (n instanceof alias_rhs6) return this.visitalias_rhs6(<alias_rhs6> n);
            else if (n instanceof macro_name_symbol0) return this.visitmacro_name_symbol0(<macro_name_symbol0> n);
            else if (n instanceof macro_name_symbol1) return this.visitmacro_name_symbol1(<macro_name_symbol1> n);
            else if (n instanceof drop_command0) return this.visitdrop_command0(<drop_command0> n);
            else if (n instanceof drop_command1) return this.visitdrop_command1(<drop_command1> n);
            else if (n instanceof name0) return this.visitname0(<name0> n);
            else if (n instanceof name1) return this.visitname1(<name1> n);
            else if (n instanceof name2) return this.visitname2(<name2> n);
            else if (n instanceof name3) return this.visitname3(<name3> n);
            else if (n instanceof name4) return this.visitname4(<name4> n);
            else if (n instanceof name5) return this.visitname5(<name5> n);
            else if (n instanceof produces0) return this.visitproduces0(<produces0> n);
            else if (n instanceof produces1) return this.visitproduces1(<produces1> n);
            else if (n instanceof produces2) return this.visitproduces2(<produces2> n);
            else if (n instanceof produces3) return this.visitproduces3(<produces3> n);
            else if (n instanceof symWithAttrs0) return this.visitsymWithAttrs0(<symWithAttrs0> n);
            else if (n instanceof symWithAttrs1) return this.visitsymWithAttrs1(<symWithAttrs1> n);
            else if (n instanceof start_symbol0) return this.visitstart_symbol0(<start_symbol0> n);
            else if (n instanceof start_symbol1) return this.visitstart_symbol1(<start_symbol1> n);
            else if (n instanceof terminal_symbol0) return this.visitterminal_symbol0(<terminal_symbol0> n);
            else if (n instanceof terminal_symbol1) return this.visitterminal_symbol1(<terminal_symbol1> n);
            else throw new Error("visit(" + n.toString() + ")");
        }
        public endVisit(n : ASTNode) : void
        {
            if (n instanceof ASTNodeToken) this.endVisitASTNodeToken(<ASTNodeToken> n);
            else if (n instanceof LPG) this.endVisitLPG(<LPG> n);
            else if (n instanceof LPG_itemList) this.endVisitLPG_itemList(<LPG_itemList> n);
            else if (n instanceof AliasSeg) this.endVisitAliasSeg(<AliasSeg> n);
            else if (n instanceof AstSeg) this.endVisitAstSeg(<AstSeg> n);
            else if (n instanceof DefineSeg) this.endVisitDefineSeg(<DefineSeg> n);
            else if (n instanceof EofSeg) this.endVisitEofSeg(<EofSeg> n);
            else if (n instanceof EolSeg) this.endVisitEolSeg(<EolSeg> n);
            else if (n instanceof ErrorSeg) this.endVisitErrorSeg(<ErrorSeg> n);
            else if (n instanceof ExportSeg) this.endVisitExportSeg(<ExportSeg> n);
            else if (n instanceof GlobalsSeg) this.endVisitGlobalsSeg(<GlobalsSeg> n);
            else if (n instanceof HeadersSeg) this.endVisitHeadersSeg(<HeadersSeg> n);
            else if (n instanceof IdentifierSeg) this.endVisitIdentifierSeg(<IdentifierSeg> n);
            else if (n instanceof ImportSeg) this.endVisitImportSeg(<ImportSeg> n);
            else if (n instanceof IncludeSeg) this.endVisitIncludeSeg(<IncludeSeg> n);
            else if (n instanceof KeywordsSeg) this.endVisitKeywordsSeg(<KeywordsSeg> n);
            else if (n instanceof NamesSeg) this.endVisitNamesSeg(<NamesSeg> n);
            else if (n instanceof NoticeSeg) this.endVisitNoticeSeg(<NoticeSeg> n);
            else if (n instanceof RulesSeg) this.endVisitRulesSeg(<RulesSeg> n);
            else if (n instanceof SoftKeywordsSeg) this.endVisitSoftKeywordsSeg(<SoftKeywordsSeg> n);
            else if (n instanceof StartSeg) this.endVisitStartSeg(<StartSeg> n);
            else if (n instanceof TerminalsSeg) this.endVisitTerminalsSeg(<TerminalsSeg> n);
            else if (n instanceof TrailersSeg) this.endVisitTrailersSeg(<TrailersSeg> n);
            else if (n instanceof TypesSeg) this.endVisitTypesSeg(<TypesSeg> n);
            else if (n instanceof RecoverSeg) this.endVisitRecoverSeg(<RecoverSeg> n);
            else if (n instanceof PredecessorSeg) this.endVisitPredecessorSeg(<PredecessorSeg> n);
            else if (n instanceof option_specList) this.endVisitoption_specList(<option_specList> n);
            else if (n instanceof option_spec) this.endVisitoption_spec(<option_spec> n);
            else if (n instanceof optionList) this.endVisitoptionList(<optionList> n);
            else if (n instanceof option) this.endVisitoption(<option> n);
            else if (n instanceof SYMBOLList) this.endVisitSYMBOLList(<SYMBOLList> n);
            else if (n instanceof aliasSpecList) this.endVisitaliasSpecList(<aliasSpecList> n);
            else if (n instanceof alias_lhs_macro_name) this.endVisitalias_lhs_macro_name(<alias_lhs_macro_name> n);
            else if (n instanceof defineSpecList) this.endVisitdefineSpecList(<defineSpecList> n);
            else if (n instanceof defineSpec) this.endVisitdefineSpec(<defineSpec> n);
            else if (n instanceof macro_segment) this.endVisitmacro_segment(<macro_segment> n);
            else if (n instanceof terminal_symbolList) this.endVisitterminal_symbolList(<terminal_symbolList> n);
            else if (n instanceof action_segmentList) this.endVisitaction_segmentList(<action_segmentList> n);
            else if (n instanceof import_segment) this.endVisitimport_segment(<import_segment> n);
            else if (n instanceof drop_commandList) this.endVisitdrop_commandList(<drop_commandList> n);
            else if (n instanceof drop_ruleList) this.endVisitdrop_ruleList(<drop_ruleList> n);
            else if (n instanceof drop_rule) this.endVisitdrop_rule(<drop_rule> n);
            else if (n instanceof optMacroName) this.endVisitoptMacroName(<optMacroName> n);
            else if (n instanceof include_segment) this.endVisitinclude_segment(<include_segment> n);
            else if (n instanceof keywordSpecList) this.endVisitkeywordSpecList(<keywordSpecList> n);
            else if (n instanceof keywordSpec) this.endVisitkeywordSpec(<keywordSpec> n);
            else if (n instanceof nameSpecList) this.endVisitnameSpecList(<nameSpecList> n);
            else if (n instanceof nameSpec) this.endVisitnameSpec(<nameSpec> n);
            else if (n instanceof rules_segment) this.endVisitrules_segment(<rules_segment> n);
            else if (n instanceof nonTermList) this.endVisitnonTermList(<nonTermList> n);
            else if (n instanceof nonTerm) this.endVisitnonTerm(<nonTerm> n);
            else if (n instanceof RuleName) this.endVisitRuleName(<RuleName> n);
            else if (n instanceof ruleList) this.endVisitruleList(<ruleList> n);
            else if (n instanceof rule) this.endVisitrule(<rule> n);
            else if (n instanceof symWithAttrsList) this.endVisitsymWithAttrsList(<symWithAttrsList> n);
            else if (n instanceof symAttrs) this.endVisitsymAttrs(<symAttrs> n);
            else if (n instanceof action_segment) this.endVisitaction_segment(<action_segment> n);
            else if (n instanceof start_symbolList) this.endVisitstart_symbolList(<start_symbolList> n);
            else if (n instanceof terminals_segment_terminalList) this.endVisitterminals_segment_terminalList(<terminals_segment_terminalList> n);
            else if (n instanceof terminalList) this.endVisitterminalList(<terminalList> n);
            else if (n instanceof terminal) this.endVisitterminal(<terminal> n);
            else if (n instanceof optTerminalAlias) this.endVisitoptTerminalAlias(<optTerminalAlias> n);
            else if (n instanceof type_declarationsList) this.endVisittype_declarationsList(<type_declarationsList> n);
            else if (n instanceof type_declarations) this.endVisittype_declarations(<type_declarations> n);
            else if (n instanceof symbol_pairList) this.endVisitsymbol_pairList(<symbol_pairList> n);
            else if (n instanceof symbol_pair) this.endVisitsymbol_pair(<symbol_pair> n);
            else if (n instanceof recover_symbol) this.endVisitrecover_symbol(<recover_symbol> n);
            else if (n instanceof END_KEY_OPT) this.endVisitEND_KEY_OPT(<END_KEY_OPT> n);
            else if (n instanceof option_value0) this.endVisitoption_value0(<option_value0> n);
            else if (n instanceof option_value1) this.endVisitoption_value1(<option_value1> n);
            else if (n instanceof aliasSpec0) this.endVisitaliasSpec0(<aliasSpec0> n);
            else if (n instanceof aliasSpec1) this.endVisitaliasSpec1(<aliasSpec1> n);
            else if (n instanceof aliasSpec2) this.endVisitaliasSpec2(<aliasSpec2> n);
            else if (n instanceof aliasSpec3) this.endVisitaliasSpec3(<aliasSpec3> n);
            else if (n instanceof aliasSpec4) this.endVisitaliasSpec4(<aliasSpec4> n);
            else if (n instanceof aliasSpec5) this.endVisitaliasSpec5(<aliasSpec5> n);
            else if (n instanceof alias_rhs0) this.endVisitalias_rhs0(<alias_rhs0> n);
            else if (n instanceof alias_rhs1) this.endVisitalias_rhs1(<alias_rhs1> n);
            else if (n instanceof alias_rhs2) this.endVisitalias_rhs2(<alias_rhs2> n);
            else if (n instanceof alias_rhs3) this.endVisitalias_rhs3(<alias_rhs3> n);
            else if (n instanceof alias_rhs4) this.endVisitalias_rhs4(<alias_rhs4> n);
            else if (n instanceof alias_rhs5) this.endVisitalias_rhs5(<alias_rhs5> n);
            else if (n instanceof alias_rhs6) this.endVisitalias_rhs6(<alias_rhs6> n);
            else if (n instanceof macro_name_symbol0) this.endVisitmacro_name_symbol0(<macro_name_symbol0> n);
            else if (n instanceof macro_name_symbol1) this.endVisitmacro_name_symbol1(<macro_name_symbol1> n);
            else if (n instanceof drop_command0) this.endVisitdrop_command0(<drop_command0> n);
            else if (n instanceof drop_command1) this.endVisitdrop_command1(<drop_command1> n);
            else if (n instanceof name0) this.endVisitname0(<name0> n);
            else if (n instanceof name1) this.endVisitname1(<name1> n);
            else if (n instanceof name2) this.endVisitname2(<name2> n);
            else if (n instanceof name3) this.endVisitname3(<name3> n);
            else if (n instanceof name4) this.endVisitname4(<name4> n);
            else if (n instanceof name5) this.endVisitname5(<name5> n);
            else if (n instanceof produces0) this.endVisitproduces0(<produces0> n);
            else if (n instanceof produces1) this.endVisitproduces1(<produces1> n);
            else if (n instanceof produces2) this.endVisitproduces2(<produces2> n);
            else if (n instanceof produces3) this.endVisitproduces3(<produces3> n);
            else if (n instanceof symWithAttrs0) this.endVisitsymWithAttrs0(<symWithAttrs0> n);
            else if (n instanceof symWithAttrs1) this.endVisitsymWithAttrs1(<symWithAttrs1> n);
            else if (n instanceof start_symbol0) this.endVisitstart_symbol0(<start_symbol0> n);
            else if (n instanceof start_symbol1) this.endVisitstart_symbol1(<start_symbol1> n);
            else if (n instanceof terminal_symbol0) this.endVisitterminal_symbol0(<terminal_symbol0> n);
            else if (n instanceof terminal_symbol1) this.endVisitterminal_symbol1(<terminal_symbol1> n);
            else throw new Error("visit(" + n.toString() + ")");
        }
    }

