#![deny(clippy::all)]

use celestial_hub_astrolabe::{lexer::Lexer as AstrolabeLexer, parser::Parser as AstrolabeParser};
use celestial_hub_compass::{
  codegen::Codegen, lexer::Lexer as CompassLexer, parser::Parser as CompassParser,
};
use napi::{Env, JsUnknown};

#[macro_use]
extern crate napi_derive;

#[napi]
pub fn transpile_to(source: String) -> napi::Result<String> {
  let lexer = CompassLexer::new(&source, "horizon").map_err(|err| {
    napi::Error::new(
      napi::Status::GenericFailure,
      format!("Failed to lex source code: {}", err),
    )
  })?;

  let ast = CompassParser::new().parse(lexer).map_err(|err| {
    napi::Error::new(
      napi::Status::GenericFailure,
      format!("Failed to parse source code: {}", err),
    )
  })?;

  celestial_hub_compass::codegen::mips::MipsCodegen
    .generate(ast, &mut Default::default())
    .map_err(|err| {
      napi::Error::new(
        napi::Status::GenericFailure,
        format!("Failed to generate code: {}", err),
      )
    })
}

#[napi]
pub fn mips_ast(env: Env, source: String) -> napi::Result<JsUnknown> {
  env.to_js_value(
    &AstrolabeParser::new()
      .parse(AstrolabeLexer::new(&source, "horizon-mips"))
      .map_err(|err| {
        napi::Error::new(
          napi::Status::GenericFailure,
          format!("Failed to parse source code: {}", err),
        )
      })?,
  )
}
