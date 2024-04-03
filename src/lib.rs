#![deny(clippy::all)]

use celestial_hub_compass::{codegen::Codegen, lexer::Lexer, parser::Parser};

#[macro_use]
extern crate napi_derive;

#[napi]
pub fn transpile_to(source: String) -> napi::Result<String> {
  let lexer = Lexer::new(&source, "horizon");

  let ast = Parser::new().parse(lexer).map_err(|err| {
    napi::Error::new(
      napi::Status::GenericFailure,
      format!("Failed to parse source code: {}", err),
    )
  })?;

  let result = celestial_hub_compass::codegen::mips::MipsCodegen
    .generate(ast)
    .map_err(|err| {
      napi::Error::new(
        napi::Status::GenericFailure,
        format!("Failed to generate code: {}", err),
      )
    })?;

  Ok(result)
}
