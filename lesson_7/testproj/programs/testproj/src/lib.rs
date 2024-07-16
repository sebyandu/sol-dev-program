use anchor_lang::prelude::*;

declare_id!("GnjZTmmxew9Xrq4CJCoaCcGzoZog7L6GsdEvqhJwAZMi");

#[program]
pub mod testproj {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
