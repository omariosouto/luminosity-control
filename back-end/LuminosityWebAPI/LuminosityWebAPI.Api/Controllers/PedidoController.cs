using LuminosityWebAPI.Domain;
using LuminosityWebAPI.Infra.DataContexts;
using System;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace LuminosityWebAPI.Api.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("api/v1/public")]
    public class PedidoController : ApiController
    {
        private LuminosityWebApiDataContext db = new LuminosityWebApiDataContext();
        // Listar todos
        [Route("pedidos")]
        public HttpResponseMessage GetPedidos()
        {
            var result = db.Pedidos.Include("Cliente").Include("Funcionario").Include("Veiculo").ToList();
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        // Adicionar Novo
        [HttpPost]
        [Route("pedidos")]
        public HttpResponseMessage PostFuncionario(Pedido pedido)
        {
            if (pedido == null)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            try
            {
                Veiculo veiculoAtt = pedido.Veiculo;
                pedido.Veiculo = null;
                db.Pedidos.Add(pedido);
                db.SaveChanges();

                db.Entry<Veiculo>(veiculoAtt).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();

                var result = pedido;
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "Falha ao incluir Pedido");
            }
            finally
            {

            }
        }
        // Alterar
        [HttpPut]
        [Route("pedidos")]
        public HttpResponseMessage PutProduct(Pedido pedido)
        {
            if (pedido == null)
                return Request.CreateResponse(HttpStatusCode.BadRequest);

            try
            {
                db.Entry<Pedido>(pedido).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();

                db.Entry<Veiculo>(pedido.Veiculo).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();

                var result = pedido;
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "Falha ao alterar Pedido");
            }
        }

        // Delete
        [HttpDelete]
        [Route("pedidos")]
        public HttpResponseMessage DeletePedido(int pedidoId)
        {
            if (pedidoId <= 0)
                return Request.CreateResponse(HttpStatusCode.BadRequest);

            try
            {
                //db.Pedidos.Remove(db.Pedidos.Find(pedidoId));
                Pedido pedido = db.Pedidos.Find(pedidoId);
                int veiculoId = pedido.VEI_INT_ID;
                Veiculo veiculo = db.Veiculos.Find(veiculoId);
                if (pedido.PED_STR_STATUS == "A")
                {
                    veiculo.VEI_STR_STATUS = "D";
                    db.Entry<Veiculo>(veiculo).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();

                    // Remover Pedido 
                    db.Pedidos.Remove(db.Pedidos.Find(pedidoId));
                    db.SaveChanges();

                }
                else
                {
                    // Remover Pedido 
                    db.Pedidos.Remove(db.Pedidos.Find(pedidoId));
                    db.SaveChanges();
                }

                return Request.CreateResponse(HttpStatusCode.OK, pedido);
            }
            catch
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "Falha ao excluir Pedido");
            }
        }
    }
}
